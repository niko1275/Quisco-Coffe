"use server"
import SalesView from '@/components/orders/SalesView';
import { prisma } from '@/lib/prisma';
import React from 'react';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    where: {
      status: 'paid',
    },
    include: {
      user: true,
      items: {
        include: {
          product: true,  
        }
      }
    }
  });

  console.log(orders)

  return (
    <div className="min-h-screen bg-gray-100">
      <SalesView items={orders} />
    </div>
  );
}