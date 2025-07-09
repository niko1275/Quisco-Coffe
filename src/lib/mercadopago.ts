import { MercadoPagoConfig } from 'mercadopago'

// Configurar Mercado Pago
export const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || 'test-token',
  options: {
    timeout: 5000,
  }
}) 