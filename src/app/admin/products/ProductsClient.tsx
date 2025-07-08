'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string | null
  stock: number
  isActive: boolean
  category: {
    name: string
  }
  createdAt: Date
}

interface ProductsClientProps {
  initialProducts: Product[]
}

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all')

  const handleDelete = async (productId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId))
      } else {
        const error = await response.json()
        alert(error.error || 'Error al eliminar producto')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar producto')
    }
  }

  const handleToggleActive = async (productId: number, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      })

      if (response.ok) {
        const updatedProduct = await response.json()
        setProducts(products.map(p => 
          p.id === productId ? updatedProduct : p
        ))
      } else {
        const error = await response.json()
        alert(error.error || 'Error al actualizar producto')
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Error al actualizar producto')
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterActive === 'all' || 
                         (filterActive === 'active' && product.isActive) ||
                         (filterActive === 'inactive' && !product.isActive)

    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
          <p className="mt-1 text-sm text-gray-600">
            Gestiona todos los productos de tu quiosco
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Producto
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
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <div>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value as 'all' | 'active' | 'inactive')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="all">Todos los productos</option>
            <option value="active">Solo activos</option>
            <option value="inactive">Solo inactivos</option>
          </select>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={product.image}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          {product.name}
                        </h3>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{product.category.name}</span>
                        <span className="mx-2">•</span>
                        <span>Stock: {product.stock}</span>
                        <span className="mx-2">•</span>
                        <span>${product.price}</span>
                      </div>
                      {product.description && (
                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleActive(product.id, product.isActive)}
                      className={`px-3 py-1 text-xs font-medium rounded-md ${
                        product.isActive
                          ? 'text-red-700 bg-red-100 hover:bg-red-200'
                          : 'text-green-700 bg-green-100 hover:bg-green-200'
                      }`}
                    >
                      {product.isActive ? 'Desactivar' : 'Activar'}
                    </button>
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="text-orange-600 hover:text-orange-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterActive !== 'all' 
              ? 'No se encontraron productos con los filtros aplicados.'
              : 'Comienza agregando tu primer producto.'
            }
          </p>
          {!searchTerm && filterActive === 'all' && (
            <div className="mt-6">
              <Link
                href="/admin/products/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Producto
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 