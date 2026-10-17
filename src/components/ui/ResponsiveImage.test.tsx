import { fireEvent, render, screen } from '@testing-library/react'
import type { ImageAsset } from '@/data/assetManifest'
import { ResponsiveImage } from './ResponsiveImage'

const asset: ImageAsset = {
  src: '/assets/test.webp',
  alt: 'Test object',
  width: 100,
  height: 80,
  status: 'placeholder-ai',
  replaceWith: 'n/a',
}

describe('ResponsiveImage', () => {
  it('renders with explicit dimensions and a prototype badge', () => {
    render(<ResponsiveImage asset={asset} />)
    const img = screen.getByRole('img', { name: 'Test object' })
    expect(img).toHaveAttribute('width', '100')
    expect(img).toHaveAttribute('height', '80')
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(screen.getByText('Prototype image')).toBeInTheDocument()
  })

  it.each(['final', 'render'] as const)('omits the badge for %s assets', (status) => {
    render(<ResponsiveImage asset={{ ...asset, status }} />)
    expect(screen.queryByText('Prototype image')).not.toBeInTheDocument()
  })

  it('falls back to a labelled placeholder when the image fails', () => {
    render(<ResponsiveImage asset={asset} />)
    fireEvent.error(screen.getByRole('img', { name: 'Test object' }))
    expect(screen.getByRole('img', { name: 'Test object' })).toHaveTextContent('Image unavailable')
  })

  it('keeps caller positioning instead of forcing relative', () => {
    const { container } = render(<ResponsiveImage asset={asset} className="absolute inset-0" />)
    expect(container.firstElementChild?.className).not.toMatch(/\brelative\b/)
  })
})
