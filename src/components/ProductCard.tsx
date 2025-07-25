'use client'

import { Plus } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import Image from 'next/image'

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  categoryId: number
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
  const { addToCartAndOpen } = useCart()

  const handleAddToCart = () => {
    addToCartAndOpen({ id, name, price,image })
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {image && image.startsWith('http') ? (
          <Image
            src={image} 
            alt={name}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🍽️</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-600">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
} 