'use client'

import { useEffect, useState } from 'react'
import { 
  Package, 
  Tag, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  DollarSign,
  Eye
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalProducts: number
  totalCategories: number
  totalUsers: number
  totalOrders: number
  revenue: number
  views: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
    views: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      name: 'Total Productos',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: 'Categorías',
      value: stats.totalCategories,
      icon: Tag,
      color: 'bg-green-500',
      change: '+5%',
      changeType: 'positive'
    },
    {
      name: 'Usuarios',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: 'Pedidos',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-orange-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      name: 'Ingresos',
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      change: '+23%',
      changeType: 'positive'
    },
    {
      name: 'Vistas',
      value: stats.views.toLocaleString(),
      icon: Eye,
      color: 'bg-indigo-500',
      change: '+18%',
      changeType: 'positive'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general de tu quiosco</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Nuevo producto agregado</p>
                  <p className="text-sm text-gray-500">Café Americano - hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Nuevo usuario registrado</p>
                  <p className="text-sm text-gray-500">maria@email.com - hace 3 horas</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Pedido completado</p>
                  <p className="text-sm text-gray-500">Pedido #1234 - hace 4 horas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Acciones Rápidas</h3>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <Link href={'/admin/products/new'}>
             
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                <Package className="h-4 w-4 mr-2" />
                Agregar Producto
              </button>
               </Link>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <Tag className="h-4 w-4 mr-2" />
                Crear Categoría
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <TrendingUp className="h-4 w-4 mr-2" />
                Ver Reportes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 