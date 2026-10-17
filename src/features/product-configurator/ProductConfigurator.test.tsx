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

  it('offers only confirmed colours', () => {
    render(<ProductConfigurator />)
    const colour = screen.getByRole('group', { name: /^Colour/ })
    const swatches = within(colour).getAllByRole('radio')
    expect(swatches.map((s) => s.getAttribute('aria-label'))).toEqual(['Teal'])
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
