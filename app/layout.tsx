import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Qabyo-Tire Trading Company | Premium Livestock Export",
  description:
    "Qabyo-Tire Trading Company - Premium livestock trading and export from Somaliland to the Gulf region since 2015. Best grade cattle, goats, sheep, and camels.",
  keywords: ["livestock export", "Somaliland", "Gulf region", "cattle", "goats", "sheep", "camels", "premium livestock"],
  icons: {
    icon: "/icon.svg",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background scroll-smooth">
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  )
}
