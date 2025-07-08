'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import Link from 'next/link'

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const { clearCart } = useCartStore()
  const [order, setOrder] = useState<any>(null)

  useEffect(() => {
    // Limpiar el carrito cuando el pago es exitoso
    clearCart()
  }, [clearCart])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-gray-600 mb-6">
            Tu orden ha sido procesada correctamente. 
            {orderId && (
              <span className="block mt-2">
                Número de orden: #{orderId}
              </span>
            )}
          </p>
          
          <div className="space-y-3">
            <Link 
              href="/"
              className="block w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 