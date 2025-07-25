'use client';


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const total = subtotal ;

  if (items.length === 0) {
    return (
      <>
      <Header />
      <div className="min-h-screen  bg-gradient-to-br from-pink-50 to-orange-50 py-12">
         
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <ShoppingCart className="h-24 w-24 text-orange-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
              <p className="text-gray-600 mb-8">¡Descubre nuestros deliciosos postres y endulza tu día!</p>
              <Link href="/category">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-500 text-white px-8 py-3 rounded-full">
                  Ver Productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
     <Header />
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-8">
     
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tu Carrito</h1>
          <p className="text-gray-600">Revisa tus productos antes de proceder al pago</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Carrito */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={32}
                      height={48}
                      className="w-full md:w-32 h-48 md:h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-semibold text-lg w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 rounded-full"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange-500">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} c/u
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            
          </div>

          {/* Resumen del pedido */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                
              
                </div>

                <Separator />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Tiempo de entrega</span>
                  </div>
                  <p className="text-blue-600 text-sm">2-3 días hábiles para pedidos regulares</p>
                  <p className="text-blue-600 text-sm">24-48 horas para tortas personalizadas</p>
                </div>

               

                <Link href="/checkout">
                  <Button size="lg" className="w-full bg-orange-500 text-white">
                    Proceder al Pago
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/category">
                  <Button variant="outline" className="w-full  text-orange-500 hover:bg-pink-50">
                    Continuar Comprando
                  </Button>
                </Link>
              </CardContent>
            </Card>

          
          </div>
        </div>
      </div>
    </div>
      </>
  );
}
