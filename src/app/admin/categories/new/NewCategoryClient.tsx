'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewCategoryClient() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>('')
  
  const [formData, setFormData] = useState({
    name: '',
    image: ''
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
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/admin/categories')
      } else {
        const error = await response.json()
        alert(error.error || 'Error al crear categoría')
      }
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Error al crear categoría')
    } finally {
      setSaving(false)
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
        
        <h1 className="text-2xl font-bold text-gray-900">Nueva Categoría</h1>
        <p className="mt-1 text-sm text-gray-600">
          Crea una nueva categoría para tu quiosco
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
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
                placeholder="Ej: Café, Donas, Galletas..."
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
                Subir Imagen
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
            {saving ? 'Creando...' : 'Crear Categoría'}
          </button>
        </div>
      </form>
    </div>
  )
} 