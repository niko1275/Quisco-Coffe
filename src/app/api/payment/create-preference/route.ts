import { NextRequest, NextResponse } from 'next/server'
import { Preference } from 'mercadopago'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { client } from '@/lib/mercadopago'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface PaymentRequest {
  items: CartItem[]
  total: number
}

export async function POST(request: NextRequest) {
  try {
    console.log('Access Token configured:', !!process.env.MERCADO_PAGO_ACCESS_TOKEN)
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
 
    const session = await getServerSession(authOptions)
    const { items, total }: PaymentRequest = await request.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No hay items en el carrito' },
        { status: 400 }
      )
    }

    // Crear la orden en la base de datos
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id ? parseInt(session.user.id) : null,
        total: total,
        items: {
          create: items.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    // Crear preferencia de pago en Mercado Pago
    const preference = {
      items: items.map((item: CartItem) => ({
        id: item.id.toString(),
        title: item.name,
        quantity: item.quantity,
        unit_price: parseInt(item.price.toString()),
        currency_id: 'CLP'
      })),
      back_urls: {
        success: `${process.env.NEXTAUTH_URL || 'https://quisco-coffe.vercel.app'}/payment/success?orderId=${order.id}`,
        failure: `${process.env.NEXTAUTH_URL || 'https://quisco-coffe.vercel.app'}/payment/failure?orderId=${order.id}`,
        pending: `${process.env.NEXTAUTH_URL || 'https://quisco-coffe.vercel.app'}/payment/pending?orderId=${order.id}`
      },
      external_reference: order.id.toString()
    }

    console.log('Creating preference with:', JSON.stringify(preference, null, 2))
    
    const preferenceClient = new Preference(client)
    const response = await preferenceClient.create({ body: preference })
    
    console.log('Preference created:', response)

    // Actualizar la orden con el preference ID
    await prisma.order.update({
      where: { id: order.id },
      data: { preferenceId: response.external_reference }
    })

    return NextResponse.json({
      preferenceId: response.id,
      initPoint: response.init_point,
      orderId: order.id
    })

  } catch (error) {
    console.error('Error creating payment preference:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Error al crear la preferencia de pago', details: error },
      { status: 500 }
    )
  }
} 