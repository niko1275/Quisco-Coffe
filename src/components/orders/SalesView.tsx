"use client"
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  DollarSign, 
  ShoppingCart, 
  Eye,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

interface Sale {
  id: string;
  customerName: string;
  customerEmail: string;
  products: string[];
  total: number;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  paymentMethod: string;
}

const mockSales: Sale[] = [
  {
    id: 'VT001',
    customerName: 'Ana García',
    customerEmail: 'ana.garcia@email.com',
    products: ['Producto A', 'Producto B'],
    total: 299.99,
    status: 'completed',
    date: '2025-01-15',
    paymentMethod: 'Tarjeta de Crédito'
  },
  {
    id: 'VT002',
    customerName: 'Carlos López',
    customerEmail: 'carlos.lopez@email.com',
    products: ['Producto C'],
    total: 149.50,
    status: 'pending',
    date: '2025-01-14',
    paymentMethod: 'PayPal'
  },
  {
    id: 'VT003',
    customerName: 'María Rodríguez',
    customerEmail: 'maria.rodriguez@email.com',
    products: ['Producto A', 'Producto D', 'Producto E'],
    total: 599.99,
    status: 'completed',
    date: '2025-01-14',
    paymentMethod: 'Transferencia'
  },
  {
    id: 'VT004',
    customerName: 'Juan Pérez',
    customerEmail: 'juan.perez@email.com',
    products: ['Producto B'],
    total: 89.99,
    status: 'cancelled',
    date: '2025-01-13',
    paymentMethod: 'Tarjeta de Débito'
  },
  {
    id: 'VT005',
    customerName: 'Sofia Martín',
    customerEmail: 'sofia.martin@email.com',
    products: ['Producto C', 'Producto F'],
    total: 429.98,
    status: 'completed',
    date: '2025-01-12',
    paymentMethod: 'Tarjeta de Crédito'
  },
  {
    id: 'VT006',
    customerName: 'Diego Hernández',
    customerEmail: 'diego.hernandez@email.com',
    products: ['Producto A'],
    total: 199.99,
    status: 'pending',
    date: '2025-01-11',
    paymentMethod: 'PayPal'
  }
];


interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string | null;
    stock: number;
    isActive: boolean;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    orderItems?: OrderItem[]; 
  }

interface User {
    image: string | null;
    id: number;
    name: string | null;
    role: string;
    email: string | null;
    password: string | null;
    emailVerified: Date | null;
  }


  interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    createdAt: Date;
    product: Product;
  }
  
  interface OrderWithItems {
    id: number;
    userId: number | null;
    total: number;
    status: string;
    paymentId: string | null;
    preferenceId: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItem[];
    user: User | null; 
  }

  interface SalesViewsProps{
    items: OrderWithItems[]
  }

const SalesView: React.FC<SalesViewsProps> = ({items}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState('');

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredSales = useMemo(() => {
    return items.filter(sale => {
        const productNames = sale.items.map(p => p.product.name);
        const customerName = sale.user?.name || '';
        const customerEmail = sale.user?.email || '';
        const saleId = sale.id.toString();
        
        const matchesSearch = !searchTerm || 
          productNames.some(name => name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          saleId.includes(searchTerm);
     
      const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
      
      const matchesDate = !dateFilter || formatDate(sale.createdAt) >= dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [items, searchTerm, statusFilter, dateFilter]);
  console.log("filter" +statusFilter)
  const stats = useMemo(() => {
    const completedSales = items.filter(sale => sale.status === 'paid');
    const totalRevenue = items.reduce((sum, sale) => sum + sale.total, 0);
    const pendingSales = mockSales.filter(sale => sale.status === 'pending');
    const pendingRevenue = pendingSales.reduce((sum, sale) => sum + sale.total, 0);

    return {
      totalSales: mockSales.length,
      completedSales: completedSales.length,
      totalRevenue,
      pendingRevenue,
      averageOrderValue: completedSales.length > 0 ? totalRevenue / completedSales.length : 0
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'paid':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Ventas</h1>
        <p className="text-gray-600">Gestiona y visualiza todas las ventas de tu tienda</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Ventas</p>
              <p className="text-2xl font-bold text-gray-900">{items.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ventas Completadas</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedSales}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos Totales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

      
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por cliente, email o ID de venta..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:w-48">
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="paid">Pagadas</option>
              <option value="pending">Pendientes</option>
              <option value="cancelled">Canceladas</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="lg:w-48">
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

       
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Venta
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Productos
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{sale.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{sale.user?.name}</div>
                      <div className="text-sm text-gray-500">{sale.user?.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {sale.items.slice(0, 2).map(item => item.product.name).join(', ')}
                      {sale.items.length > 2 && (
                        <span className="text-gray-500"> +{sale.items.length - 2} más</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatCurrency(sale.total)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(sale.status)}
                      <span className={getStatusBadge(sale.status)}>
                      {sale.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(sale.createdAt)}
                  </td>
                 
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">
              <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No se encontraron ventas</p>
              <p className="text-sm">Intenta ajustar los filtros de búsqueda</p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredSales.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{filteredSales.length}</span> de{' '}
            <span className="font-medium">{filteredSales.length}</span> ventas
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Anterior
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesView;