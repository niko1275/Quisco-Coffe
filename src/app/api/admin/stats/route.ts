import {  NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    // Obtener estadísticas
    const [
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.user.count(),
      prisma.product.count() // Por ahora usamos productos como pedidos, después agregaremos modelo Order
    ])

    // Calcular ingresos (simulado por ahora)
    const revenue = totalProducts * 5.50 // Simulación

    // Vistas (simulado)
    const views = Math.floor(Math.random() * 1000) + 500

    return NextResponse.json({
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      revenue,
      views
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
} 