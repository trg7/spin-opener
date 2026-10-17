import { create } from 'zustand'

/** Pure UI state (no commerce). The cart store arrives in Stage 3. */
interface UiState {
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
}))
