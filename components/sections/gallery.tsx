"use client"

import { useState } from "react"
import Image from "next/image"

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4699-tNbGegt2XgUd8aygfjfeYowpfUhKvk.jpeg",
    alt: "Premium camels ready for export at Qabyo-Tire Trading Company facility",
    caption: "Premium Grade Camels",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4698-rVu7PoXCp9fu31a4AQYlPB7U8JvyZQ.jpeg",
    alt: "Best quality goats sourced from Somaliland rangelands",
    caption: "Best Grade Goats",
  },
]

export function Gallery() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Operations</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Showcasing our premium livestock, modern facilities, and trusted export operations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5">
                <p className="text-white font-medium text-sm">{img.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close image viewer"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full max-w-4xl aspect-[16/10]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryImages[selected].src}
              alt={galleryImages[selected].alt}
              fill
              className="object-contain rounded-lg"
              sizes="90vw"
              priority
            />
          </div>

          <p className="absolute bottom-6 text-white text-center font-medium">{galleryImages[selected].caption}</p>

          {selected > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelected(selected - 1) }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {selected < galleryImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setSelected(selected + 1) }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  )
}
