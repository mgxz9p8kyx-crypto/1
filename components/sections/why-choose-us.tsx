import { ShieldCheck, Clock, TrendingUp, Users, Scale, Coins } from "lucide-react"

const reasons = [
  {
    title: "10 Years Experience",
    description: "A decade of operation in Hargeisa and international trade.",
    icon: Clock,
  },
  {
    title: "Reliable Processes",
    description: "Streamlined export procedures for on-time delivery.",
    icon: ShieldCheck,
  },
  {
    title: "High-Quality Livestock",
    description: "Strict health and quality standards for all exports.",
    icon: TrendingUp,
  },
  {
    title: "Strong Relationships",
    description: "Trusted by major importers across the Gulf region.",
    icon: Users,
  },
  {
    title: "Ethical Sourcing",
    description: "Fair trade practices with local pastoral communities.",
    icon: Scale,
  },
  {
    title: "Transparent Pricing",
    description: "Clear, competitive pricing with no hidden costs.",
    icon: Coins,
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-emerald-900/30 rounded-full blur-3xl"></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white mb-6">
                Why Choose Qabyo-Tire Trading Company?
              </h2>
              <p className="text-primary-foreground/90 text-xl leading-relaxed max-w-xl">
                We distinguish ourselves through unwavering commitment to quality, reliability, and ethical business
                practices. Our reputation is built on trust.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <div key={index} className="flex flex-col gap-3 group">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                      <reason.icon className="h-6 w-6 text-white group-hover:text-accent-foreground transition-colors" />
                    </div>
                    <h3 className="font-bold text-lg text-white">{reason.title}</h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80 pl-[3.5rem] leading-relaxed">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block h-full min-h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur-md border border-white/20 p-12 flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="text-center space-y-8">
                <div className="relative">
                  <div className="text-8xl font-black text-white/10 select-none">2015</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white">Est. 2015</div>
                  </div>
                </div>

                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto" />

                <div className="space-y-2">
                  <div className="text-2xl font-semibold text-white">Hargeisa, Somaliland</div>
                  <div className="text-lg text-white/70 max-w-sm mx-auto font-light">
                    "Connecting the Horn of Africa to the World through sustainable livestock trade."
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-6 h-6 text-accent fill-accent" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
