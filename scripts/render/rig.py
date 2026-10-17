"""
SPIN OPENER render rig. Loads the client .blend (never saved back), rebuilds a studio scene and
renders named shots. Usage: blender -b --disable-autoexec references/3d/spin-top.blend --python scripts/render/rig.py -- <outdir> <shot> [<shot>...]
Scene is converted to real metres (model authored with 1 unit = 1 mm).
"""
import bpy, sys, math, mathutils

args = sys.argv[sys.argv.index('--') + 1:]
OUT, SHOTS = args[0], args[1:]
sc = bpy.context.scene
obj = bpy.data.objects['spin-opener']

# ---- units: mm -> m -------------------------------------------------------
obj.scale = tuple(s * 0.001 for s in obj.scale)
bpy.context.view_layer.update()
ws = [obj.matrix_world @ mathutils.Vector(c) for c in obj.bound_box]
ZMIN = min(v.z for v in ws); ZMAX = max(v.z for v in ws)
H = ZMAX - ZMIN
CENTER = mathutils.Vector((0, 0, ZMIN + H * 0.5))

# ---- materials -------------------------------------------------------------
def srgb_to_lin(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def petg(hex_):
    m = bpy.data.materials.new('so-petg'); m.use_nodes = True
    nt = m.node_tree; b = nt.nodes['Principled BSDF']
    r, g, bl = (int(hex_[i:i + 2], 16) / 255 for i in (1, 3, 5))
    b.inputs['Base Color'].default_value = (srgb_to_lin(r), srgb_to_lin(g), srgb_to_lin(bl), 1)
    b.inputs['Roughness'].default_value = 0.62
    b.inputs['Specular IOR Level'].default_value = 0.32
    # FDM layer lines: 0.2 mm bands along world Z + faint noise
    geo = nt.nodes.new('ShaderNodeNewGeometry')
    wave = nt.nodes.new('ShaderNodeTexWave'); wave.wave_type = 'BANDS'; wave.bands_direction = 'Z'
    wave.inputs['Scale'].default_value = 1 / 0.0002 / 6.283 * 6.283 * 0.2  # ~0.2 mm period in metres
    wave.inputs['Distortion'].default_value = 0.0
    noise = nt.nodes.new('ShaderNodeTexNoise'); noise.inputs['Scale'].default_value = 900
    mix = nt.nodes.new('ShaderNodeMath'); mix.operation = 'ADD'
    nt.links.new(geo.outputs['Position'], wave.inputs['Vector'])
    nt.links.new(geo.outputs['Position'], noise.inputs['Vector'])
    nt.links.new(wave.outputs['Fac'], mix.inputs[0])
    sc_ = nt.nodes.new('ShaderNodeMath'); sc_.operation = 'MULTIPLY'; sc_.inputs[1].default_value = 0.25
    nt.links.new(noise.outputs['Fac'], sc_.inputs[0]); nt.links.new(sc_.outputs[0], mix.inputs[1])
    bump = nt.nodes.new('ShaderNodeBump'); bump.inputs['Strength'].default_value = 0.12
    bump.inputs['Distance'].default_value = 0.00004
    nt.links.new(mix.outputs[0], bump.inputs['Height']); nt.links.new(bump.outputs['Normal'], b.inputs['Normal'])
    return m

def steel():
    m = bpy.data.materials.new('so-steel'); m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (0.42, 0.41, 0.40, 1)
    b.inputs['Metallic'].default_value = 1.0
    b.inputs['Roughness'].default_value = 0.34
    return m

TEAL = '#008E96'  # brand teal (style guide); client material is #077354-ish — see DECISIONS
mp, ms = petg(TEAL), steel()
obj.data.materials[0] = ms   # unassigned collar -> assumed stainless (TO CONFIRM)
obj.data.materials[1] = ms   # tip
obj.data.materials[2] = mp   # body
for p in obj.data.polygons:
    p.use_smooth = True

# ---- render settings -------------------------------------------------------
sc.render.engine = 'CYCLES'
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'; prefs.get_devices()
    for d in prefs.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e:
    print('GPU unavailable:', e)
sc.cycles.samples = 256
sc.cycles.use_denoising = True
sc.render.film_transparent = True
sc.render.image_settings.file_format = 'PNG'
sc.render.image_settings.color_mode = 'RGBA'
# Standard keeps the brand teal faithful (AgX desaturates it towards pastel)
sc.view_settings.view_transform = 'Standard'
sc.view_settings.look = 'None'
sc.view_settings.exposure = -0.7  # lit midtones ≈ brand teal #008E96 family
FAST = any(a.endswith('@fast') for a in SHOTS)
if FAST:
    sc.cycles.samples = 48
    sc.render.resolution_percentage = 50

# ---- studio: shadow catcher, lights, world ---------------------------------
bpy.ops.mesh.primitive_plane_add(size=2, location=(0, 0, ZMIN))
floor = bpy.context.active_object; floor.name = 'floor'; floor.is_shadow_catcher = True

def area(name, loc, size, power, color=(1, 0.96, 0.9), shadow=True):
    ld = bpy.data.lights.new(name, 'AREA'); ld.size = size; ld.energy = power; ld.color = color
    ld.use_shadow = shadow  # only the key casts onto the catcher -> compact contact shadow
    lo = bpy.data.objects.new(name, ld); sc.collection.objects.link(lo); lo.location = loc
    lo.rotation_euler = (CENTER - lo.location).to_track_quat('-Z', 'Y').to_euler()
    return lo

area('key', (-0.24, -0.24, 0.30), 0.55, 3.2)
area('fill', (0.30, -0.16, 0.10), 0.40, 0.8, (0.95, 0.97, 1.0), shadow=False)
area('rim', (0.10, 0.30, 0.16), 0.30, 1.4, shadow=False)
area('top', (0.0, 0.0, 0.45), 0.9, 1.2, shadow=False)
world = bpy.data.worlds.new('so-world'); sc.world = world; world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.86, 0.83, 0.79, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.22

cam_data = bpy.data.cameras.new('cam'); cam = bpy.data.objects.new('cam', cam_data)
sc.collection.objects.link(cam); sc.camera = cam
cam_data.lens = 100; cam_data.sensor_width = 36; cam_data.clip_start = 0.01

def aim(elev_deg, azim_deg, dist, target=CENTER):
    e, a = math.radians(elev_deg), math.radians(azim_deg)
    cam.location = target + mathutils.Vector((dist * math.cos(e) * math.sin(a), -dist * math.cos(e) * math.cos(a), dist * math.sin(e)))
    cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()

def render(name, w, h):
    sc.render.resolution_x, sc.render.resolution_y = w, h
    sc.render.filepath = f'{OUT}/{name}.png'
    bpy.ops.render.render(write_still=True)
    print('RENDERED', name)

def underside_setup():
    # Camera below the floor: drop the catcher, light the underside from below/front.
    floor.hide_render = True
    area('under', (-0.12, -0.24, -0.16), 0.45, 2.4)
    area('under-fill', (0.22, -0.10, -0.08), 0.35, 0.8, (0.95, 0.97, 1.0), shadow=False)

SHOTS_DEF = {
    # elevation, azimuth, distance (m), resolution
    'hero': lambda: (aim(9, -20, 0.29), render('hero', 1600, 2000)),
    'thumb': lambda: (aim(9, -20, 0.30), render('thumb', 1000, 1000)),
    'underside': lambda: (underside_setup(), aim(-34, -20, 0.30), render('underside', 1800, 1200)),
}
for s in SHOTS:
    SHOTS_DEF[s.split('@')[0]]()
