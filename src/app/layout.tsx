import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono ,Playwrite_AU_QLD,Delius_Swash_Caps} from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playwright = Playwrite_AU_QLD({
   variable: "--font-playwright",
  weight: ["100", "200", "300", "400"],
  display: "swap",
})

const deliusSwash = Delius_Swash_Caps({
  variable: "--font-delius-swash",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuioscoCoffe - Deliciosos productos frescos",
  description: "Descubre nuestra deliciosa selección de café, donas, galletas y más. Todo preparado con los mejores ingredientes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${playwright.variable} ${deliusSwash.variable} antialiased`}
      >
        <Providers>
        
          {children}
        </Providers>
      </body>
    </html>
  );
}
