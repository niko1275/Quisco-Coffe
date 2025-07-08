import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Verificar que es una notificación de pago
    if (data.type === 'payment') {
      const paymentId = data.data.id
      
      // Obtener información del pago desde Mercado Pago
      // En producción, deberías hacer una llamada a la API de Mercado Pago
      // para obtener los detalles del pago usando el paymentId
      
      // Por ahora, simulamos que el pago fue exitoso
      const orderId = parseInt(data.data.external_reference || '0')
      
      if (orderId > 0) {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: 'paid',
            paymentId: paymentId.toString()
          }
        })
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    )
  }
} 