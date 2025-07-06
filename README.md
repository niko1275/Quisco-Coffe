# QuioscoCafé - Aplicación de Quiosco de Comida

Una aplicación web moderna para un quiosco de comida construida con Next.js, TypeScript, Prisma y Tailwind CSS.

## Características

- 🏠 **Página de inicio** con categorías de productos
- 🔍 **Búsqueda de productos** en tiempo real
- 🛒 **Carrito de compras** funcional con persistencia
- 📱 **Diseño responsive** para móviles y desktop
- ⚡ **Rendimiento optimizado** con Next.js 15
- 🎨 **UI moderna** con Tailwind CSS
- 🔄 **Estado global** con Zustand
- 📄 **Paginación** con 12 productos por página
- 🔐 **Autenticación** con Auth.js (NextAuth)

## Tecnologías Utilizadas

- **Next.js 15** - Framework de React
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **PostgreSQL** - Base de datos
- **Tailwind CSS** - Framework de CSS
- **Zustand** - Gestión de estado global
- **Auth.js** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Lucide React** - Iconos

## Estructura del Proyecto

```
src/
├── app/                    # Páginas de Next.js
│   ├── api/               # API Routes
│   │   ├── auth/          # Rutas de autenticación
│   │   │   ├── [...nextauth]/ # Configuración de Auth.js
│   │   │   └── register/  # Registro de usuarios
│   │   ├── categories/    # API de categorías
│   │   └── products/      # API de productos
│   ├── category/[slug]/   # Página de categoría
│   ├── login/            # Página de login
│   ├── register/         # Página de registro
│   ├── search/           # Página de búsqueda
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página de inicio
├── components/           # Componentes reutilizables
│   ├── Cart.tsx         # Componente del carrito
│   ├── CategoryCard.tsx # Tarjeta de categoría
│   ├── Header.tsx       # Header de la aplicación
│   ├── Pagination.tsx   # Componente de paginación
│   ├── ProductCard.tsx  # Tarjeta de producto
│   ├── Providers.tsx    # Providers de la app
│   └── SearchBar.tsx    # Barra de búsqueda
├── hooks/               # Hooks personalizados
│   ├── useCart.ts       # Hook combinado para carrito
│   └── usePagination.ts # Hook para paginación
├── store/               # Stores de Zustand
│   ├── cartStore.ts     # Store del carrito
│   └── uiStore.ts       # Store de la UI
├── types/               # Tipos de TypeScript
│   └── next-auth.d.ts   # Tipos de Auth.js
├── generated/           # Cliente de Prisma generado
└── lib/                 # Utilidades y funciones
    ├── data.ts         # Funciones de datos
    └── prisma.ts       # Instancia de Prisma
```

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd my-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar la base de datos**
   - Crear un archivo `.env` con la variable `DATABASE_URL`
   - Ejecutar las migraciones:
   ```bash
   npx prisma migrate dev
   ```

4. **Poblar la base de datos**
   ```bash
   npx prisma db seed
   ```

5. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

## Uso

### Página de Inicio
- Muestra todas las categorías disponibles
- Cada categoría muestra el número de productos
- Diseño responsive con grid adaptativo

### Búsqueda
- Barra de búsqueda en el header
- Búsqueda por nombre de producto
- Resultados en tiempo real
- **Paginación de resultados**

### Carrito de Comras
- Agregar productos desde cualquier página
- Modificar cantidades
- Ver total de la compra
- Modal responsive
- **Persistencia en localStorage**
- **Apertura automática al agregar productos**

### Categorías
- Páginas dinámicas por categoría
- Lista de productos filtrados
- Navegación con breadcrumbs
- **Paginación con 12 productos por página**

### Paginación
- **12 productos por página** en todas las vistas
- Navegación intuitiva con números de página
- Indicadores de página actual
- Botones de anterior/siguiente
- Información de productos mostrados (ej: "Mostrando 1-12 de 45 productos")

## Gestión de Estado con Zustand

### Ventajas sobre Context API:
- ✅ **Más simple** - No necesita providers
- ✅ **Mejor rendimiento** - Re-renderizado selectivo
- ✅ **Persistencia fácil** - Middleware integrado
- ✅ **TypeScript nativo** - Tipado automático
- ✅ **Menos boilerplate** - Código más limpio

### Stores Implementados:

**cartStore.ts**
- Gestión de productos en el carrito
- Cálculo automático de totales
- Persistencia en localStorage
- Funciones: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`

**uiStore.ts**
- Estado de la interfaz de usuario
- Control del modal del carrito
- Funciones: `openCart`, `closeCart`, `toggleCart`

## API Routes

### `/api/categories`
- `GET` - Obtener todas las categorías con conteo de productos

### `/api/categories/[slug]`
- `GET` - Obtener categoría específica con sus productos

### `/api/products`
- `GET` - Obtener todos los productos

## Base de Datos

### Modelos

**Category**
- `id` - ID único
- `name` - Nombre de la categoría
- `slug` - Slug único para URLs
- `products` - Relación con productos

**Product**
- `id` - ID único
- `name` - Nombre del producto
- `price` - Precio
- `image` - Imagen del producto
- `categoryId` - ID de la categoría
- `category` - Relación con categoría

## Scripts Disponibles

- `npm run dev` - Ejecutar en desarrollo
- `npm run build` - Construir para producción
- `npm run start` - Ejecutar en producción
- `npm run lint` - Ejecutar linter
- `npx prisma generate` - Regenerar cliente de Prisma
- `npx prisma db seed` - Poblar base de datos

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
