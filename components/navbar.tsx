"use client"

import * as React from "react"
import Link from "next/link"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Home", href: "#hero" },
  { name: "Livestock", href: "#livestock" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white border-b border-border"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <Logo className="h-14 w-14" />
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground tracking-tight leading-tight">Qabyo Tire Trading Company</span>
            <span className="text-[11px] font-medium text-emerald-600 tracking-wider uppercase">Connecting Lands, Delivering Excellence</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-colors hover:text-foreground hover:bg-muted"
            >
              {item.name}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            <Link href="#contact">Get a Quote</Link>
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col gap-6 pt-8">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                <Logo className="h-12 w-12" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">QABYO-TIRE</span>
                  <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Trading Company</span>
                </div>
              </Link>
              <div className="h-px bg-border" />
              <nav className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-base font-medium text-foreground rounded-lg transition-colors hover:bg-muted"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
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
