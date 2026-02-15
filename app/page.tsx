import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { Partners } from "@/components/sections/partners"
import { Tracker } from "@/components/sections/tracker"
import { About } from "@/components/sections/about"
import { Services } from "@/components/sections/services"
import { Gallery } from "@/components/sections/gallery"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Testimonials } from "@/components/sections/testimonials"
import { FAQ } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Partners />
        <Tracker />
        <About />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
