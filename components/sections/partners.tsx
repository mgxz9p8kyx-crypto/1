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
    <section className="py-8 md:py-10 border-b border-border bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 mb-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted Export Markets
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-8 px-4 md:px-6 flex-wrap">
        {markets.map((m) => (
          <div key={m.name} className="flex flex-col sm:flex-row items-center gap-2 whitespace-nowrap">
            <span className="text-4xl md:text-5xl font-system emoji-rendering">
              {m.flag}
            </span>
            <span className="text-xs md:text-sm font-medium text-foreground">{m.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
