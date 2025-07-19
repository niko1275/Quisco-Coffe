import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import EditCategoryClient from './EditCategoryClient'

interface EditCategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params
  const categoryId = parseInt(id)

  if (isNaN(categoryId)) {
    notFound()
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      products: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!category) {
    notFound()
  }

  return <EditCategoryClient category={category} />
} 