import Link from 'next/link'

interface CategoryCardProps {
  id: number
  name: string
  slug: string
  productCount?: number
}

export default function CategoryCard({ id, name, slug, productCount = 0 }: CategoryCardProps) {
  return (
    <Link href={`/category/${slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center cursor-pointer">
        <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">
            {name === 'Café' && '☕'}
            {name === 'Hamburguesas' && '🍔'}
            {name === 'Pizzas' && '🍕'}
            {name === 'Donas' && '🍩'}
            {name === 'Pasteles' && '🎂'}
            {name === 'Galletas' && '🍪'}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-sm text-gray-500">{productCount} productos</p>
      </div>
    </Link>
  )
} 