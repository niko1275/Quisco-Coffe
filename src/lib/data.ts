import { prisma } from './prisma'

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    })
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getProducts(categorySlug?: string) {
  try {
    const where = categorySlug ? {
      category: {
        slug: categorySlug
      }
    } : {}

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true
      }
    })
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getCategoryBySlug(slug: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: true
      }
    })
    return category
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
} 