import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-50 py-20 md:py-32 lg:py-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-slate-200 to-slate-50" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Premium Livestock Trading Since 2015
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl xl:text-7xl text-slate-900 leading-[1.1]">
              Qabyo-Tire <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-600">
                Trading Company
              </span>
            </h1>

            <p className="max-w-[600px] text-lg text-slate-600 md:text-xl font-medium leading-relaxed">
              Your Trusted Partner for Quality Livestock Exports to the Gulf Region. We ensure the highest standards of
              health, quality, and reliability.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                <Link href="#contact">
                  Contact Us
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 bg-transparent"
                asChild
              >
                <Link href="#services">Our Services</Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto aspect-video w-full max-w-[500px] lg:max-w-none lg:mr-0 lg:aspect-auto">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/camels-hero.jpg"
                alt="Qabyo-Tire Trading Company Livestock Camels"
                fill
                className="object-cover w-full h-full"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating stats card - kept from previous design but updated style */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <span className="text-2xl">🌍</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Exporting to</p>
                  <p className="text-lg font-bold text-slate-900">6 Gulf Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
