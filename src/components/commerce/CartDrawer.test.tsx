import { act, render, screen } from '@testing-library/react'
import { useUiStore } from '@/store/uiStore'
import { CartDrawer } from './CartDrawer'

describe('CartDrawer', () => {
  beforeAll(() => {
    // jsdom lacks the modal dialog API
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute('open', '')
    }
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute('open')
      this.dispatchEvent(new Event('close'))
    }
  })

  it('opens from the UI store and shows the mocked checkout notice', () => {
    render(<CartDrawer />)
    act(() => useUiStore.getState().openCart())
    expect(screen.getByRole('dialog', { name: 'Your bag' })).toBeVisible()
    expect(screen.getByRole('button', { name: /Checkout/ })).toBeDisabled()
    expect(screen.getByText('Prototype — checkout unavailable')).toBeInTheDocument()
  })

  it('closes and syncs the store', () => {
    render(<CartDrawer />)
    act(() => useUiStore.getState().openCart())
    act(() => screen.getByRole('button', { name: 'Close bag' }).click())
    expect(useUiStore.getState().isCartOpen).toBe(false)
  })
})
