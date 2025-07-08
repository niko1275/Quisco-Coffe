'use client'

import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import { useState } from 'react'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, getTotal, getItemCount, clearCart } = useCartStore()
  const { isCartOpen, openCart, closeCart } = useUIStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const total = getTotal()
  const itemCount = getItemCount()

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsProcessing(true)
    try {
      const response = await fetch('/api/payment/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          total: total
        })
      })

      const data = await response.json()

      if (data.error) {
        alert('Error al procesar el pago: ' + data.error)
        return
      }

      // Redirigir al usuario a Mercado Pago
      if (data.initPoint) {
        window.location.href = data.initPoint
      }

    } catch (error) {
      console.error('Error al procesar el pago:', error)
      alert('Error al procesar el pago. Inténtalo de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      {/* Cart Button */}
      <div className="relative">
        <button 
          onClick={openCart}
          className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <ShoppingCart className="w-6 h-6" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0  bg-gray-100 bg-opacity-50 z-100 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Carrito</h2>
              <button
                onClick={closeCart}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-xl font-bold text-orange-600">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isProcessing}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Procesando...' : 'Proceder al pago'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
} 