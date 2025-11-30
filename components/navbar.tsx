"use client"

import * as React from "react"
import Link from "next/link"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "#hero" },
  { name: "Live Tracker", href: "#tracker" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Why Choose Us", href: "#why-choose-us" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-900/10 bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity bg-white rounded-lg px-3 py-2"
        >
          <Logo className="h-16 w-16" />
          <span className="hidden md:flex flex-col">
            <span className="text-sm font-bold text-emerald-700 leading-none">QABYO-TIRE</span>
            <span className="text-xs text-emerald-600">TRADING COMPANY</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-white transition-colors hover:text-emerald-100"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold">
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-emerald-500">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <Logo className="h-10 w-10" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-emerald-700">QABYO-TIRE</span>
                  <span className="text-xs text-emerald-600">TRADING COMPANY</span>
                </div>
              </Link>
              <nav className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-slate-700 transition-colors hover:text-emerald-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 text-white mt-4">
                <Link href="#contact" onClick={() => setIsOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
