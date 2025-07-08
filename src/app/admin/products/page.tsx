import { prisma } from '@/lib/prisma'
import ProductsClient from './ProductsClient'

export default async function AdminProductsPage() {
  // Consultar productos directamente desde el servidor
  const products = await prisma.product.findMany({
    include: {
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return <ProductsClient initialProducts={products} />
} 