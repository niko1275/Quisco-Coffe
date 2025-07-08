import { NextRequest, NextResponse } from 'next/server'
import { getCategoryBySlug } from '@/lib/data'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> } 
) {
  try {
    const { slug } = await params 
    const category = await getCategoryBySlug(slug)
    
    if (!category) {
      return NextResponse.json(
        { error: 'Categoría no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 