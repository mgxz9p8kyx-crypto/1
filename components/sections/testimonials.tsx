"use client"

import { useState } from "react"

const testimonials = [
  {
    quote: "Qabyo-Tire Trading Company has been our go-to supplier for over 5 years. Their livestock consistently meets the highest standards of quality, and their documentation is always impeccable.",
    label: "Verified Importer, Saudi Arabia",
  },
  {
    quote: "What sets Qabyo-Tire apart is their commitment to animal welfare and health compliance. Every shipment arrives in excellent condition with full veterinary certification.",
    label: "Verified Importer, UAE",
  },
  {
    quote: "From sourcing to delivery, the entire process with Qabyo-Tire Trading Company is seamless. Their team understands Gulf market requirements and delivers premium-grade livestock every time.",
    label: "Verified Importer, Qatar",
  },
  {
    quote: "Reliable, professional, and transparent. Qabyo-Tire provides the best quality Somaliland livestock with proper health certificates and on-time delivery. Highly recommended.",
    label: "Verified Importer, Djibouti",
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            What Our Partners Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 text-center">
            <svg className="mx-auto mb-6 h-8 w-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-lg md:text-xl leading-relaxed text-foreground mb-8 italic">
              {`"${testimonials[active].quote}"`}
            </p>
            <p className="text-sm font-medium text-muted-foreground">{testimonials[active].label}</p>
          </div>

          <div className="flex items-center justify-center gap-2.5 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-primary w-8"
                    : "bg-border w-2.5 hover:bg-muted-foreground/40"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
