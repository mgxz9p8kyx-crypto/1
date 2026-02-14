import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/components/logo"

const livestockTypes = [
  { name: "Camels", icon: "M12 3c-1.5 2-3 4-3 6s1 3 2 4c-2 0-4 1-5 3s0 4 1 5c2-1 4-1 5 0s2 2 5 2 4-1 5-2 2-2 5 0c1-1 2-3 1-5s-3-3-5-3c1-1 2-2 2-4s-1.5-4-3-6c-1 1.5-2 3-3 4-1-1-2-2.5-3-4z" },
  { name: "Sheep", icon: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" },
  { name: "Goats", icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" },
  { name: "Cattle", icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" },
]

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary w-fit">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Trusted Since 2015
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl xl:text-6xl text-balance leading-[1.1]">
                Raising Standards in{" "}
                <span className="text-primary">Livestock</span>{" "}
                Trading
              </h1>
              <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
                From the rich pastoral lands of Somaliland to premium markets across the Gulf -- we source, certify, and deliver the finest camels, sheep, goats, and cattle with care and integrity.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base" asChild>
                <Link href="#contact">Request a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="#services">Our Livestock</Link>
              </Button>
            </div>

            {/* Livestock type chips */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {livestockTypes.map((type) => (
                <div
                  key={type.name}
                  className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2"
                >
                  <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={type.icon} />
                  </svg>
                  <span className="text-sm font-medium text-foreground">{type.name}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">10+ Years</p>
                  <p className="text-xs text-muted-foreground">of Trust</p>
                </div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">6 Gulf Nations</p>
                  <p className="text-xs text-muted-foreground">Served</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/camels-hero.jpg"
                alt="Premium camels for export by Qabyo-Tire Trading Company"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <Logo className="h-10 w-10 border-2 border-white/30" />
                  <div>
                    <p className="text-white font-semibold text-sm">Qabyo-Tire Trading Company</p>
                    <p className="text-white/70 text-xs">Connecting Lands, Delivering Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
