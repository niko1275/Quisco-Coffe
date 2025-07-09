
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iniciar Sesión - Mi App',
  description: 'Página de inicio de sesión',
}

export default function LoginLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children} 
        </div>
      </div>
    </div>
  )
}