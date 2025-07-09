import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Header from '@/components/Header'

export default async function OrdersPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-8">Debes iniciar sesión para ver tus órdenes.</div>
      </>
    )
  }

  const orders = await prisma.order.findMany({
    where: {
        userId: parseInt(session.user.id),
        status: 'paid'
      },
    orderBy: { createdAt: 'desc' },
    include: { items: { include: { product: true } } }
  })

  return (
    <>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Tus Órdenes</h1>
        <Link href="/" className="inline-block mb-6 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">Volver al inicio</Link>
        {orders.length === 0 ? (
          <div>No tienes órdenes aún.</div>
        ) : (
          <ul className="space-y-4">
            {orders.map(order => (
              <li key={order.id} className="border p-4 rounded-lg bg-white shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <div>
                    <span className="font-semibold">Orden #{order.id}</span> -
                    <span className={`ml-2 ${order.status === 'paid' ? 'text-green-600' : 'text-gray-600'}`}> 
                      {order.status === 'paid' ? 'Pagada' : order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div className="mb-2">Total: <span className="font-bold text-orange-600">${order.total.toFixed(2)}</span></div>
                <div>
                  <span className="font-semibold">Productos:</span>
                  <ul className="ml-4 list-disc">
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.product.name} x {item.quantity} (${item.price.toFixed(2)} c/u)
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
} 