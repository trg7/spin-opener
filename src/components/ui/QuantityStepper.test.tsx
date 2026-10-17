import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { QuantityStepper } from './QuantityStepper'

function Harness({ initial, max }: { initial: number; max: number }) {
  const [v, setV] = useState(initial)
  return <QuantityStepper value={v} onChange={setV} label="Quantity" max={max} />
}

describe('QuantityStepper', () => {
  it('increments and decrements within bounds', async () => {
    const user = userEvent.setup()
    render(<Harness initial={1} max={2} />)
    const dec = screen.getByRole('button', { name: 'Decrease quantity' })
    const inc = screen.getByRole('button', { name: 'Increase quantity' })
    expect(dec).toBeDisabled()
    await user.click(inc)
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(inc).toBeDisabled()
    await user.click(dec)
    expect(screen.getByText('1')).toBeInTheDocument()
  })
})
