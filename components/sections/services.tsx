import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    title: "Livestock Sourcing",
    description: "Direct sourcing of Best Grade / Premium Quality livestock from trusted pastoral communities.",
    icon: "🐑",
  },
  {
    title: "Quality Assurance",
    description: "Rigorous veterinary inspections and health certifications for every animal.",
    icon: "✓",
  },
  {
    title: "Export Documentation",
    description: "Handling all necessary permits, health certificates, and customs documentation.",
    icon: "📋",
  },
  {
    title: "Logistics Coordination",
    description: "End-to-end logistics management from local holding grounds to port of destination.",
    icon: "🚚",
  },
  {
    title: "Gulf Market Expertise",
    description: "Deep understanding of import requirements for Saudi Arabia, UAE, and others.",
    icon: "🌍",
  },
  {
    title: "Post-Delivery Support",
    description: "Continuous communication and support ensuring satisfaction after delivery.",
    icon: "☎️",
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 bg-emerald-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100 rounded-full">
            Our Expertise
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            End-to-End Livestock Solutions
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            At <strong>Qabyo-Tire Trading Company</strong>, we provide comprehensive livestock trading solutions
            tailored for the Gulf market. We handle every step of the process with professionalism and care.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              className="transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 group bg-white border-slate-200/60"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/5 transition-all duration-300 text-2xl">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-slate-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
