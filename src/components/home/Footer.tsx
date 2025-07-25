'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import React from 'react';

const footerLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
];

export const Footer = () => {
  return (
    <footer className="bg-footer bg-cover bg-no-repeat pt-16 relative text-white">
      <div className="absolute inset-0 bg-black/90 z-0" />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <Image
              src="/QuioscoCoffe.png"
              alt="Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <p className="text-sm text-gray-300">
              QuioscoCoffe – Pastelería artesanal con sabor único. ¡Gracias por tu preferencia!
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href="" className="text-gray-400 hover:text-white transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="text-gray-400 hover:text-white transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="text-gray-400 hover:text-white transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="text-gray-400 hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/20 pt-6 text-sm text-center text-gray-400">
          &copy; {new Date().getFullYear()} QuioscoCoffe. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
