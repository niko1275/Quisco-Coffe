'use client'

import Link from 'next/link'
import SearchBar from './SearchBar'
import Cart from './Cart'
import { useSession, signIn, signOut } from 'next-auth/react'
import { User, LogOut } from 'lucide-react'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-orange-600 flex-shrink-0">
            QuioscoCafé
          </Link>

          {/* Search Bar (oculto en mobile) */}
          <div className="w-full order-3 sm:order-none sm:w-auto sm:block">
            <div className="sm:block hidden">
              <SearchBar />
            </div>
          </div>

          {/* Cart y Auth */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Cart />
            
            {status === "loading" ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/orders"
                  className="px-3 py-1.5 text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-md transition-colors font-medium"
                >
                  Mis Órdenes
                </Link>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <User className="w-4 h-4" />
                  <span className="font-medium">
                    {session.user?.name || session.user?.email?.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
              >
                <User className="w-4 h-4" />
                Ingresar
              </button>
            )}
          </div>
        </div>
        {/* SearchBar visible solo en mobile, debajo del header */}
        <div className="block sm:hidden mt-2">
          <SearchBar />
        </div>
      </div>
    </header>
  )
} 