import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function seedExampleData() {
  try {
    console.log('🌱 Iniciando seed de datos de ejemplo...')

    // Crear categorías
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'cafe' },
        update: {},
        create: {
          name: 'Café',
          slug: 'cafe'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'donas' },
        update: {},
        create: {
          name: 'Donas',
          slug: 'donas'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'galletas' },
        update: {},
        create: {
          name: 'Galletas',
          slug: 'galletas'
        }
      }),
      prisma.category.upsert({
        where: { slug: 'bebidas' },
        update: {},
        create: {
          name: 'Bebidas',
          slug: 'bebidas'
        }
      })
    ])

    console.log('✅ Categorías creadas:', categories.map(c => c.name))

    // Crear productos de ejemplo
    const products = await Promise.all([
      prisma.product.upsert({
        where: { id: 1 },
        update: {},
        create: {
          name: 'Café Americano',
          price: 2.50,
          image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop',
          description: 'Café negro tradicional con agua caliente',
          stock: 50,
          isActive: true,
          categoryId: categories[0].id
        }
      }),
      prisma.product.upsert({
        where: { id: 2 },
        update: {},
        create: {
          name: 'Café Latte',
          price: 3.50,
          image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=400&fit=crop',
          description: 'Café con leche espumada',
          stock: 30,
          isActive: true,
          categoryId: categories[0].id
        }
      }),
      prisma.product.upsert({
        where: { id: 3 },
        update: {},
        create: {
          name: 'Dona de Chocolate',
          price: 1.50,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
          description: 'Dona glaseada con chocolate',
          stock: 25,
          isActive: true,
          categoryId: categories[1].id
        }
      }),
      prisma.product.upsert({
        where: { id: 4 },
        update: {},
        create: {
          name: 'Dona de Vainilla',
          price: 1.25,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
          description: 'Dona glaseada con vainilla',
          stock: 20,
          isActive: true,
          categoryId: categories[1].id
        }
      }),
      prisma.product.upsert({
        where: { id: 5 },
        update: {},
        create: {
          name: 'Galletas de Chocolate',
          price: 2.00,
          image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=400&fit=crop',
          description: 'Galletas caseras con chips de chocolate',
          stock: 40,
          isActive: true,
          categoryId: categories[2].id
        }
      }),
      prisma.product.upsert({
        where: { id: 6 },
        update: {},
        create: {
          name: 'Té Verde',
          price: 2.00,
          image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
          description: 'Té verde natural',
          stock: 35,
          isActive: true,
          categoryId: categories[3].id
        }
      })
    ])

    console.log('✅ Productos creados:', products.map(p => p.name))
    console.log('🎉 Seed completado exitosamente!')

  } catch (error) {
    console.error('❌ Error en seed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedExampleData() 