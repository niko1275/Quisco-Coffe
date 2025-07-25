import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  id: number
  name: string
  slug: string
  image:string
  productCount?: number
}

export default function CategoryCard({  name, slug, productCount = 0 ,image}: CategoryCardProps) {

  return (
    <Link href={`/category/${slug}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center cursor-pointer">
        <div className="w-42 h-42 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center ">
        {image ? (
     
          <Image
            src={image} 
            alt={name}
            width={400}
            height={400}
            className="w-24 h-24 rounded-full"
          />
          
        ) : (
          <div className="w-24 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">🍽️</span>
          </div>
        )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 font-serif">{name}</h3>
        <p className="text-sm  bg-gradient-to-r from-orange-300 to-orange-500 w-[30%] font-bold rounded-full text-white mx-auto">{productCount} productos</p>
      </div>
    </Link>
  )
} 