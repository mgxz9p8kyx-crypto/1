"use client"

const markets = [
  { name: "Saudi Arabia", flag: "🇸🇦" },
  { name: "United Arab Emirates", flag: "🇦🇪" },
  { name: "Qatar", flag: "🇶🇦" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Oman", flag: "🇴🇲" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Djibouti", flag: "🇩🇯" },
]

export function Partners() {
  return (
    <section className="bg-card py-10 md:py-14 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted Export Markets We Serve
        </p>
      </div>

      {/* Scrolling strip */}
      <div className="relative">
        <div className="flex animate-scroll">
          {[...markets, ...markets].map((market, i) => (
            <div
              key={`${market.name}-${i}`}
              className="flex flex-shrink-0 items-center gap-3 px-8 md:px-12"
            >
              <span className="text-4xl md:text-5xl" role="img" aria-label={`${market.name} flag`}>
                {market.flag}
              </span>
              <span className="text-sm md:text-base font-semibold text-foreground whitespace-nowrap">
                {market.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-8">
        <p className="text-center text-xs text-muted-foreground">
          Delivering premium-grade livestock to importers across the Gulf region and East Africa since 2015
        </p>
      </div>
    </section>
  )
}
