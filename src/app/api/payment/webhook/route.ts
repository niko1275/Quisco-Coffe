"use server"
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { client } from '../create-preference/route'
import { Payment } from 'mercadopago'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const id = data.data.id
    console.log('Webhook data:', data)
    // Solo si es notificación de pago
    if (data.type === 'payment') {
      const paymentId = data.data.id
      // Obtener detalles del pago desde Mercado Pago
      const payment = await new Payment(client).get({id: id});
      console.log('Payment:', payment)
      // Validar que el pago esté aprobado
      if (payment.status === 'approved') {
        const orderId = parseInt(payment.external_reference || '0')
        if (orderId > 0) {
          // Actualizar la orden a 'paid'
          await prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'paid',
              paymentId: paymentId.toString()
            }
          })

          // Buscar los OrderItem asociados a la orden y descontar stock
          const orderItems = await prisma.orderItem.findMany({
            where: { orderId },
          })

          for (const item of orderItems) {
            await prisma.product.update({
              where: { id: item.productId },
              data: {
                stock: {
                  decrement: item.quantity
                }
              }
            })
          }
        }
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