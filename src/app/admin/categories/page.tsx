import { prisma } from '@/lib/prisma'
import CategoryClient from './EditCategorias'

export default async function AdminCategoriesPage() {
  // Consultar categorías con sus productos
  const categories = await prisma.category.findMany({
    include: {
      products: true
    },
    orderBy: {
      name: 'asc'
    }
  })

  return <CategoryClient categorias={categories} />
} 