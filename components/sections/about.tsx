import Image from "next/image"

const highlights = [
  "Exporting to Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain",
  "Strong relationships with Somaliland pastoral communities",
  "Full veterinary inspection and health certification",
  "Complete compliance with Gulf import regulations",
]

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">About Us</p>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                A Decade of Excellence in Livestock Trading
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Founded in 2015 in Hargeisa, Somaliland, Qabyo-Tire Trading Company has grown into a premier
                livestock export firm. We bridge Somali pastoral communities with international markets across the
                Gulf region, maintaining the highest standards of quality and animal welfare.
              </p>
            </div>

            <div className="space-y-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-muted/60 p-5 border border-border">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                {'"'}Our mission is to deliver excellence in every shipment, ensuring the prosperity of our local communities
                and the satisfaction of our international partners.{'"'}
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-xl">
              <Image
                src="/images/goats-about.jpg"
                alt="Premium quality goats by Qabyo-Tire Trading Company"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold">Premium Quality Livestock</p>
                <p className="text-white/70 text-sm mt-0.5">Sourced from the best pastoral lands in Somaliland</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
