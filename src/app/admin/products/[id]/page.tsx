import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditProductClient from '../EditProductClient'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: PageProps) {
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