"use client"

const markets = [
  { name: "Saudi Arabia", flag: "\u{1F1F8}\u{1F1E6}" },
  { name: "UAE", flag: "\u{1F1E6}\u{1F1EA}" },
  { name: "Qatar", flag: "\u{1F1F6}\u{1F1E6}" },
  { name: "Kuwait", flag: "\u{1F1F0}\u{1F1FC}" },
  { name: "Oman", flag: "\u{1F1F4}\u{1F1F2}" },
  { name: "Bahrain", flag: "\u{1F1E7}\u{1F1ED}" },
  { name: "Egypt", flag: "\u{1F1EA}\u{1F1EC}" },
  { name: "Djibouti", flag: "\u{1F1E9}\u{1F1EF}" },
]

export function Partners() {
  return (
    <section className="py-8 md:py-10 border-b border-border bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted Export Markets
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-scroll">
          {[...markets, ...markets].map((m, i) => (
            <div key={`${m.name}-${i}`} className="flex flex-shrink-0 items-center gap-2.5 px-6 md:px-10">
              <span className="text-3xl md:text-4xl" role="img" aria-label={`${m.name} flag`}>{m.flag}</span>
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
