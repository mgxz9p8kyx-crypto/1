"use client"

import { useState } from "react"

const testimonials = [
  {
    quote:
      "Qabyo-Tire Trading Company has been our go-to supplier for over 5 years. Their livestock consistently meets the highest standards of quality, and their documentation is always impeccable. Truly a reliable partner.",
    author: "Ahmed Al-Rashidi",
    role: "Senior Procurement Manager",
    company: "Gulf Livestock Imports, Saudi Arabia",
  },
  {
    quote:
      "What sets Qabyo-Tire Trading Company apart is their commitment to animal welfare and health compliance. Every shipment arrives in excellent condition with full veterinary certification. We trust them completely.",
    author: "Khalid bin Saeed",
    role: "Director of Operations",
    company: "Al-Nakheel Trading, UAE",
  },
  {
    quote:
      "From sourcing to delivery, the entire process with Qabyo-Tire Trading Company is seamless. Their team understands the Gulf market requirements and delivers premium-grade livestock every single time.",
    author: "Mohammed Al-Thani",
    role: "Import Division Head",
    company: "Qatar Livestock Holdings",
  },
  {
    quote:
      "Reliable, professional, and transparent. Qabyo-Tire Trading Company provides the best quality Somaliland livestock with proper health certificates and on-time delivery. A partner we highly recommend.",
    author: "Yusuf Hassan",
    role: "Managing Director",
    company: "Horn of Africa Exports, Djibouti",
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/70 mb-3">
            Client Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
            What Our Partners Say
          </h2>
        </div>

        {/* Active testimonial */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <svg
            className="mx-auto mb-6 h-10 w-10 text-primary-foreground/30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-lg md:text-xl leading-relaxed text-primary-foreground/90 mb-8 italic">
            {`"${testimonials[active].quote}"`}
          </p>
          <div>
            <p className="text-base font-bold text-primary-foreground">
              {testimonials[active].author}
            </p>
            <p className="text-sm text-primary-foreground/70">
              {testimonials[active].role}
            </p>
            <p className="text-sm text-primary-foreground/60">
              {testimonials[active].company}
            </p>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                i === active
                  ? "bg-primary-foreground w-8"
                  : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
