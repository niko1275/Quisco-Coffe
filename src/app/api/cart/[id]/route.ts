import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log("Id recibido:", id);
       
    if (!id || id === 'null') {
      return NextResponse.json({ error: 'ID de orden requerido' }, { status: 400 });
    }
    

  const orders = await prisma.order.findMany({
    where: {
      status: 'paid',
      id: parseInt(id),
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return NextResponse.json(orders);
}