import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    })
    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Error al obtener producto' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {

    const body = await request.json()
    const { name, price, image, description, stock, categoryId, isActive } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (price !== undefined) updateData.price = parseFloat(price)
    if (image !== undefined) updateData.image = image
    if (description !== undefined) updateData.description = description
    if (stock !== undefined) updateData.stock = parseInt(stock)
    if (categoryId !== undefined) updateData.categoryId = parseInt(categoryId)
    if (isActive !== undefined) updateData.isActive = isActive

    const product = await prisma.product.update({
      where: {
        id: parseInt(params.id)
      },
      data: updateData,
      include: {
        category: true
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Error al actualizar producto' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params

    await prisma.product.delete({
      where: {
        id: parseInt(id)
      }
    })

    return NextResponse.json({ message: 'Producto eliminado exitosamente' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Error al eliminar producto' },
      { status: 500 }
    )
  }
} 