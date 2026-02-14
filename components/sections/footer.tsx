import Link from "next/link"
import Logo from "@/components/logo"

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-background leading-tight">QABYO-TIRE</span>
                <span className="text-[10px] text-background/50 tracking-wider uppercase">Trading Company</span>
              </div>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Connecting Lands, Delivering Excellence. Premium livestock exports since 2015.
            </p>
            <a
              href="https://wa.me/2520634241477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-background/60 hover:text-[#25D366] transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: "Home", href: "#hero" },
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Gallery", href: "#gallery" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Services</h3>
            <ul className="space-y-2.5 text-sm text-background/60">
              <li>Livestock Sourcing</li>
              <li>Quality Assurance</li>
              <li>Export Documentation</li>
              <li>Logistics Coordination</li>
              <li>Gulf Market Expertise</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-background mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-background/60">
              <li>Road 1, Central Business District, Hargeisa, Somaliland</li>
              <li>
                <a href="mailto:qabyotire99@gmail.com" className="hover:text-background transition-colors">
                  qabyotire99@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+2520634241477" className="hover:text-background transition-colors block">
                  +252 063 4241477
                </a>
                <a href="tel:+447951301222" className="hover:text-background transition-colors block">
                  +44 7951 301222 (UK)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/40">
          <p>{"© "}2015-{new Date().getFullYear()} Qabyo-Tire Trading Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
