"""Orthographic side silhouette mask at 10 px/mm. Args after --: <out.png>"""
import bpy, sys, mathutils
out = sys.argv[sys.argv.index('--') + 1]
sc = bpy.context.scene
sc.render.engine = 'BLENDER_WORKBENCH'
sc.render.film_transparent = True
sc.render.resolution_x = 800; sc.render.resolution_y = 800  # 80 mm field -> 10 px/mm
cd = bpy.data.cameras.new('c'); cd.type = 'ORTHO'; cd.ortho_scale = 80
c = bpy.data.objects.new('c', cd); sc.collection.objects.link(c); sc.camera = c
c.location = (0, -500, 33); c.rotation_euler = (1.5707963, 0, 0)
cd.clip_end = 2000
sc.render.filepath = out
bpy.ops.render.render(write_still=True)
print('MASK done; centre z=33 at row 400, 10px/mm')
