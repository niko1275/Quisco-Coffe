'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, X, Package, Edit, Trash2, Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string | null
  stock: number
  isActive: boolean
  createdAt: Date
}

interface Category {
  id: number
  name: string
  slug: string
  image: string | null
  products: Product[]
}

interface EditCategoryClientProps {
  category: Category
}

export default function EditCategoryClient({ category }: EditCategoryClientProps) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(category.image || '')
  
  const [formData, setFormData] = useState({
    name: category.name,
    image: category.image || ''
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Subir a S3 vía API route
      const formData = new FormData()
      formData.append('file', file)
      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (res.ok && data.url) {
          setImagePreview(data.url)
          setFormData(prev => ({ ...prev, image: data.url }))
        } else {
          alert(data.error || 'Error al subir imagen')
        }
      } catch (err) {
        alert('Error al subir imagen: ' + err)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/categories/${category.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/categories')
      } else {
        const error = await response.json()
        alert(error.error || 'Error al actualizar categoría')
      }
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Error al actualizar categoría')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Recargar la página para actualizar la lista
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Error al eliminar producto')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Error al eliminar producto')
    }
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
      <div className="mb-8">
        <Link 
          href="/admin/categories" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a Categorías
        </Link>
        
        <h1 className="text-2xl font-bold text-gray-900">Editar Categoría</h1>
        <p className="mt-1 text-sm text-gray-600">
          Modifica la información de la categoría
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario de edición */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información básica */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre de la Categoría *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

               
              </div>
            </div>

            {/* Imagen */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Imagen de la Categoría</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Subir Nueva Imagen
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                </div>

                {imagePreview && (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('')
                        setFormData(prev => ({ ...prev, image: '' }))
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/admin/categories"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de productos */}
        <div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Productos en esta Categoría</h3>
              <span className="text-sm text-gray-500">{category.products.length} productos</span>
            </div>

            {category.products.length > 0 ? (
              <div className="space-y-3">
                {category.products.map((product) => (
                  <div key={product.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <div className="flex-shrink-0 h-10 w-10">
                      {product.image && isValidUrl(product.image) ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Package className="w-5 h-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span>${product.price}</span>
                        <span>•</span>
                        <span>Stock: {product.stock}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-orange-600 hover:text-orange-900 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Esta categoría no tiene productos asociados.
                </p>
                <div className="mt-4">
                  <Link
                    href="/admin/products/new"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Producto
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 