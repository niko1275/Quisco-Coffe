import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'

export const useCart = () => {
  const cartStore = useCartStore()
  const uiStore = useUIStore()

  const addToCartAndOpen = (product: { id: number; name: string; price: number }) => {
    cartStore.addToCart(product)
    uiStore.openCart()
  }

  return {
    ...cartStore,
    ...uiStore,
    addToCartAndOpen,
    total: cartStore.getTotal(),
    itemCount: cartStore.getItemCount(),
    orderId: cartStore.orderId,
    setOrderId: cartStore.setOrderId,
    clearOrderId: cartStore.clearOrderId
  }
} 