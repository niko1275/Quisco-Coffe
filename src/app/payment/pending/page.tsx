'use client'

import { useSearchParams } from 'next/navigation'
import { Clock } from 'lucide-react'
import Link from 'next/link'

export default function PaymentPending() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-center">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Pago Pendiente
          </h1>
          <p className="text-gray-600 mb-6">
            Tu pago está siendo procesado. 
            Te notificaremos cuando se complete.
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