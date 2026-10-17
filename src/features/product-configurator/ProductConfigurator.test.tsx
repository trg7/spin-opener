import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductConfigurator } from './ProductConfigurator'

const KINDS = ['top', 'stand', 'bundle']
const setupOptions = () =>
  screen.getAllByRole('radio').filter((r) => KINDS.includes((r as HTMLInputElement).value))

describe('ProductConfigurator', () => {
  it('defaults to the top with its provisional price', () => {
    render(<ProductConfigurator />)
    const top = screen.getByRole('radio', { name: 'SPIN OPENER' })
    expect(top).toBeChecked()
    expect(top).toHaveAccessibleDescription('The spinning top. A$24.99')
    expect(screen.getAllByText('A$24.99').length).toBeGreaterThan(0)
    expect(screen.getByText('Prototype price')).toBeInTheDocument()
  })

  it('shows Price TBC and a notice for the stand and bundle — never an invented price', async () => {
    const user = userEvent.setup()
    render(<ProductConfigurator />)
    await user.click(screen.getByRole('radio', { name: 'Top + Stand' }))
    expect(
      screen.getByText('Pricing for this option is still being confirmed.'),
    ).toBeInTheDocument()
    expect(screen.queryByText(/A\$34\.99|A\$14\.99/)).not.toBeInTheDocument()
    // Bundle needs both colour pickers
    expect(screen.getByRole('group', { name: /^Top/ })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: /^Stand/ })).toBeInTheDocument()
  })

  it('offers the six launch colours', () => {
    render(<ProductConfigurator />)
    const colour = screen.getByRole('group', { name: /^Colour/ })
    const swatches = within(colour).getAllByRole('radio')
    expect(swatches.map((s) => s.getAttribute('aria-label'))).toEqual([
      'Teal',
      'Red',
      'Blue',
      'Green',
      'White',
      'Orange',
    ])
  })

  it('says when the photo does not show the selected colour', async () => {
    const user = userEvent.setup()
    render(<ProductConfigurator />)
    expect(screen.queryByText(/imagery coming soon/)).not.toBeInTheDocument()
    await user.click(screen.getByRole('radio', { name: 'Red' }))
    expect(screen.getByText('Shown in Teal. Red imagery coming soon.')).toBeInTheDocument()
  })

  it('lets the bundle mix top and stand colours', async () => {
    const user = userEvent.setup()
    render(<ProductConfigurator />)
    await user.click(screen.getByRole('radio', { name: 'Top + Stand' }))
    const stand = screen.getByRole('group', { name: /^Stand/ })
    expect(within(stand).getAllByRole('radio')).toHaveLength(6)
    await user.click(within(stand).getByRole('radio', { name: 'White' }))
    expect(within(stand).getByRole('radio', { name: 'White' })).toBeChecked()
  })

  it('has three setup options', () => {
    render(<ProductConfigurator />)
    expect(
      setupOptions().filter((r) =>
        ['top', 'stand', 'bundle'].includes((r as HTMLInputElement).value),
      ),
    ).toHaveLength(3)
  })
})
