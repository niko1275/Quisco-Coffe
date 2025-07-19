import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)
    const body = await request.json()
    const { name, image } = body

    if (!name) {
      return NextResponse.json(
        { error: 'El nombre es requerido' },
        { status: 400 }
      )
    }

    // Generar slug automáticamente
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        slug,
        image: image || null
      },
      include: {
        products: true
      }
    })

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error('Error updating category:', error)
    return NextResponse.json(
      { error: 'Error al actualizar categoría' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const categoryId = parseInt(id)

    // Verificar si la categoría tiene productos
    const categoryWithProducts = await prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        products: true
      }
    })

    if (!categoryWithProducts) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      )
    }

    if (categoryWithProducts.products.length > 0) {
      return NextResponse.json(
        { error: 'No se puede eliminar una categoría que tiene productos asociados' },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id: categoryId }
    })

    return NextResponse.json({ message: 'Categoría eliminada correctamente' })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json(
      { error: 'Error al eliminar categoría' },
      { status: 500 }
    )
  }
} 