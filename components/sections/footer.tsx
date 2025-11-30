import Link from "next/link"
import Logo from "@/components/logo"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo className="h-8 w-8 text-white border-white" />
              <span className="text-xl font-bold text-white uppercase">Qabyo-Tire Trading Company</span>
            </div>
            <p className="text-sm">Connecting Lands, Delivering Excellence.</p>
            <div className="flex gap-4 pt-2">
              <Link href="#" className="hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#hero" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Livestock Sourcing</li>
              <li>Quality Assurance</li>
              <li>Export Documentation</li>
              <li>Logistics Coordination</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="opacity-70">HQ:</span>
                <span>
                  Road 1, Central Business District
                  <br />
                  Hargeisa, Somaliland
                </span>
              </li>
              <li>
                <a
                  href="mailto:qabyotire99@gmail.com"
                  className="hover:text-white hover:underline transition-colors flex items-center gap-2"
                >
                  <span className="opacity-70">Email:</span> qabyotire99@gmail.com
                </a>
              </li>
              <li>
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+2520634241477"
                    className="hover:text-white hover:underline transition-colors flex items-center gap-2"
                  >
                    <span className="opacity-70">Tel:</span> +252 063 4241477
                  </a>
                  <a
                    href="tel:+447951301222"
                    className="hover:text-white hover:underline transition-colors flex items-center gap-2"
                  >
                    <span className="opacity-70">UK:</span> +44 7951 301222
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-emerald-800/50 text-center text-sm text-slate-400">
          <p>© 2015-{new Date().getFullYear()} Qabyo-Tire Trading Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
