import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  orderId: number | null
  setOrderId: (id: number) => void
  clearOrderId: () => void
  addToCart: (product: { id: number; name: string; price: number }) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orderId: null,

      setOrderId: (id) => set({ orderId: id }),
      clearOrderId: () => set({ orderId: null }),
      
      addToCart: (product) => {
        set((state) => {
          const existing = state.items.find(item => item.id === product.id)
          if (existing) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }]
          }
        })
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId)
          return
        }
        set((state) => ({
          items: state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage', // nombre para localStorage
      partialize: (state) => ({ items: state.items, orderId: state.orderId }), // persistir items y orderId
    }
  )
) 