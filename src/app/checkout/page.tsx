'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Truck, 
  Calendar,
  Shield,
  CheckCircle,
  ArrowLeft,
  User
} from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';



export default function Checkout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
 const items = useCartStore((state) => state.items);
 const { setOrderId} = useCartStore()
  // Mock order data
  

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal ;

  const handlePlaceOrder  = async () => {
  
    try {
      const response = await fetch('/api/payment/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items,
          total: total
        })

      })

      const data = await response.json()
      setOrderId(data.orderId)
      console.log('Order ID set:', data.orderId)
      if (data.error) {
        alert('Error al procesar el pago: ' + data.error)
        return
      }

      if (data.initPoint) {
        window.location.href = data.initPoint
      }
 } catch (error) {
      console.error('Error al procesar el pago:', error)
      alert('Error al procesar el pago. Inténtalo de nuevo.')
    } 
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <div className="space-y-6">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Pedido Confirmado!</h1>
                  <p className="text-gray-600">Tu pedido #12345 ha sido procesado exitosamente</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Detalles de Entrega</h3>
                  <p className="text-green-700 text-sm">
                    📅 Fecha: {deliveryDate || 'Mañana'}<br/>
                    🕐 Hora: {deliveryTime || '10:00 AM - 12:00 PM'}<br/>
                    📍 Dirección: Calle Principal 123, Ciudad
                  </p>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-orange-500 hover:bg-orange-500">
                    Seguir mi Pedido
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continuar Comprando
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-orange-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-orange-500 hover:text-orange-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Carrito
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Finalizar Compra</h1>
          <p className="text-gray-600">Completa tu información para procesar el pedido</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold
                  ${step >= stepNumber 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`
                    w-16 h-1 mx-2
                    ${step > stepNumber ? 'bg-orange-400' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-20 text-sm text-gray-600">
            <span>Información</span>
            <span>Entrega</span>
            <span>Pago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" placeholder="Tu apellido" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="tu@email.com" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" placeholder="(+56)" />
                  </div>

                  <div>
                    <Label htmlFor="address">Dirección Completa</Label>
                    <Textarea id="address" placeholder="Calle, número, colonia, ciudad, código postal" />
                  </div>

                  <div>
                    <Label htmlFor="notes">Notas Especiales (Opcional)</Label>
                    <Textarea id="notes" placeholder="Instrucciones de entrega, alergias, etc." />
                  </div>

                  <Button 
                    onClick={() => setStep(2)}
                    className="w-full bg-orange-600 hover:bg-orange-600"
                  >
                    Continuar a Entrega
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Método de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Entrega a Domicilio</p>
                            <p className="text-sm text-gray-600">2-3 días hábiles</p>
                          </div>
                          <span className="font-semibold text-green-600">Gratis</span>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Recoger en Tienda</p>
                            <p className="text-sm text-gray-600">Disponible hoy</p>
                          </div>
                          <span className="font-semibold text-green-600">Gratis</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="deliveryDate">Fecha Preferida</Label>
                      <Input 
                        id="deliveryDate" 
                        type="date" 
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deliveryTime">Hora Preferida</Label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                      >
                        <option value="">Seleccionar hora</option>
                        <option value="9:00-11:00">9:00 AM - 11:00 AM</option>
                        <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                        <option value="13:00-15:00">1:00 PM - 3:00 PM</option>
                        <option value="15:00-17:00">3:00 PM - 5:00 PM</option>
                        <option value="17:00-19:00">5:00 PM - 7:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">Información Importante</span>
                    </div>
                    <ul className="text-blue-600 text-sm space-y-1">
                      <li>• Las tortas personalizadas requieren 24-48 horas</li>
                      <li>• Entregas disponibles de Lunes a Sábado</li>
                      <li>• Para pedidos urgentes, contáctanos directamente</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Atrás
                    </Button>
                    <Button 
                      onClick={() => setStep(3)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600"
                    >
                      Continuar al Pago
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Información de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          
                            <Image src='/MP.png' alt='MP' width={56} height={56}/>
                            Mercadopago
                        </div>
                      </Label>
                    </div>
                 
                  </RadioGroup>


                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      Acepto los <a href="#" className="text-orange-500 hover:underline">términos y condiciones</a> y la <a href="#" className="text-orang hover:underline">política de privacidad</a>
                    </Label>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <Shield className="h-4 w-4" />
                      <span className="font-medium">Pago Seguro</span>
                    </div>
                    <p className="text-green-600 text-sm">
                      Tu información está protegida con encriptación SSL de 256 bits
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      Atrás
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder}
                      className="flex-1  bg-orange-500  hover:bg-orange-600"
                    >
                      Confirmar Pedido
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
{/* Order Summary Sidebar */}
<div className="w-full max-w-md">
  <Card className="sticky top-8 border border-gray-200 shadow-lg">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">Resumen del Pedido</CardTitle>
    </CardHeader>

    <CardContent className="space-y-6">

      {/* Order Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <Image
              src={item.image}
              alt={item.name}
              width={16}
              height={16}
              quality={100}
              className="w-16 h-16 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h4 className="text-sm font-medium">{item.name}</h4>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Cantidad: {item.quantity}</span>
                <span className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Pricing Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
       
       
      </div>

      <Separator />

      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="text-pink-600">${total.toFixed(2)}</span>
      </div>

    

    </CardContent>
  </Card>
</div>


        </div>
      </div>
    </div>
  );
}