"use client"

const markets = [
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Bahrain", flag: "🇧🇭" },
]

export function Partners() {
  return (
    <section className="py-8 md:py-10 border-b border-border bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted Export Markets
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-scroll gap-2">
          {[...markets, ...markets, ...markets].map((m, i) => (
            <div key={`${m.name}-${i}`} className="flex flex-shrink-0 items-center gap-2.5 px-6 md:px-10">
              <span className="text-3xl md:text-4xl leading-none" role="img" aria-label={`${m.name} flag`}>
                {m.flag}
              </span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
