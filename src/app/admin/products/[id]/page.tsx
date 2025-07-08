import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditProductClient from '../EditProductClient'

interface Category {
  id: number
  name: string
  slug: string
}

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string | null
  stock: number
  isActive: boolean
  categoryId: number
  category: {
    name: string
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  // Consultar producto y categorías directamente desde el servido
  const { id } = await params
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    }),
    prisma.category.findMany({
      orderBy: { name: 'asc' }
    })
  ])

  if (!product) {
    notFound()
  }

  return <EditProductClient product={product} categories={categories} />
} 