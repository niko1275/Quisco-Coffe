'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/Header'
import ProductCard from '@/components/ProductCard'
import Pagination from '@/components/Pagination'
import { usePagination } from '@/hooks/usePagination'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  categoryId: number
  category: {
    id: number
    name: string
    slug: string
  }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const {
    currentPage,
    totalPages,
    paginatedItems: filteredProducts,
    goToPage,
    startIndex,
    endIndex,
    totalItems
  } = usePagination({
    items: products,
    itemsPerPage: 12
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/products')
        if (response.ok) {
          const allProducts = await response.json()
          const filtered = allProducts.filter((product: Product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
          )
          setProducts(filtered)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [query])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Buscando productos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>

        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Resultados de búsqueda
          </h1>
          {query && (
            <p className="text-gray-600">
              Mostrando {startIndex}-{endIndex} de {totalItems} productos encontrados para "{query}"
            </p>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  categoryId={product.categoryId}
                />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              {query ? `No se encontraron productos para "${query}"` : 'Ingresa un término de búsqueda'}
            </p>
            {query && (
              <Link 
                href="/" 
                className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Ver todas las categorías
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
} 