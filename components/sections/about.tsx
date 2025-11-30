import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

export function About() {
  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
                About Qabyo-Tire Trading Company
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded in 2015 in Hargeisa, Somaliland, Qabyo-Tire Trading Company has established itself as a premier
                livestock trading and export firm. We bridge the gap between Somali pastoral communities and
                international markets in the Gulf region.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                "Exporting to Saudi Arabia, UAE, Qatar, Kuwait, Oman, Bahrain",
                "Strong relationships with pastoral communities",
                "Expertise in livestock standards & health certification",
                "Full compliance with Gulf import regulations",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <blockquote className="text-slate-600 italic border-l-4 border-primary pl-4">
                "Our mission is to deliver excellence in every shipment, ensuring the prosperity of our local
                communities and the satisfaction of our international partners."
              </blockquote>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden relative shadow-xl border border-slate-100">
              <Image
                src="/images/goats-about.jpg"
                alt="Qabyo-Tire Trading Company Livestock Goats"
                fill
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold">Premium Quality Livestock</h3>
                <p className="opacity-90 text-sm mt-1">Sourced from the best pastoral lands</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
