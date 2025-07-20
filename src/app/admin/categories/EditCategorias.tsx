'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Search, Package } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Category, Product } from '@/generated/prisma'
import { usePagination } from '@/hooks/usePagination'
import Pagination from '@/components/Pagination'

// Tipo personalizado que incluye los productos
type CategoryWithProducts = Category & {
  products: Product[]
}

interface CategoryClientProps {
  categorias: CategoryWithProducts[]
}

export default function CategoryClient({ categorias }: CategoryClientProps) {
  const [categories] = useState<CategoryWithProducts[]>(categorias)
  const [searchTerm, setSearchTerm] = useState('')
  const [isChangingPage, setIsChangingPage] = useState(false)

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const {currentPage, goToPage,  paginatedItems, totalPages, resetToFirstPage} = usePagination({
    items: filteredCategories,
    itemsPerPage: 12
  })

  // Resetear a la primera página cuando cambien los filtros
  useEffect(() => {
    resetToFirstPage()
  }, [searchTerm, resetToFirstPage])

  // Función para manejar el cambio de página
  const handlePageChange = (page: number) => {
    setIsChangingPage(true)
    goToPage(page)
    // Scroll suave hacia arriba para mejor UX
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Simular un pequeño delay para mostrar el cambio
    setTimeout(() => {
      setIsChangingPage(false)
    }, 100)
  }



  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona todas las categorías de tu quiosco
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Categoría
          </Link>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar categorías..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Tabla de categorías */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md relative">
        {/* Overlay de carga */}
        {isChangingPage && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
        
        {/* Información de paginación */}
        {filteredCategories.length > 0 && (
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-700">
              Mostrando {((currentPage - 1) * 12) + 1} a {Math.min(currentPage * 12, filteredCategories.length)} de {filteredCategories.length} categorías
            </p>
          </div>
        )}
        
        <ul className="divide-y divide-gray-200">
          {paginatedItems.map((categoria) => (
            <li key={categoria.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex sm:justify-between flex-row sm:flex-row">
                  <div className="flex items-center ">
                    <div className="flex-shrink-0 h-12 w-12">
                      {categoria.image && isValidUrl(categoria.image) ? (
                        <Image
                          src={categoria.image}
                          alt={categoria.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          {categoria.name}
                        </h3>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span className="mx-2">•</span>
                        <span>Productos: {categoria.products?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 ml-10 sm:mt-0 ">
                    <Link
                      href={`/admin/categories/${categoria.id}`}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                   
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay categorías</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm 
              ? 'No se encontraron categorías con el término de búsqueda.'
              : 'Comienza agregando tu primera categoría.'
            }
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Link
                href="/admin/categories/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Categoría
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 