"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What types of livestock does Qabyo-Tire Trading Company export?",
    answer:
      "We specialise in exporting four categories of premium-grade livestock: sheep, goats, cattle, and camels. All animals are sourced from the finest pastoral rangelands of Somaliland and undergo rigorous health screening and quality grading before export.",
  },
  {
    question: "Which countries do you export to?",
    answer:
      "Our primary export markets include Saudi Arabia, the United Arab Emirates, Qatar, Kuwait, Oman, Bahrain, Egypt, and Djibouti. We have established long-term relationships with importers across the Gulf region and East Africa.",
  },
  {
    question: "What health certifications do your livestock come with?",
    answer:
      "Every shipment is accompanied by full veterinary health certificates issued by the Republic of Somaliland Ministry of Livestock and Fishery Development. All animals are vaccinated, quarantined, and inspected in compliance with Gulf Cooperation Council (GCC) import regulations.",
  },
  {
    question: "What is the minimum order quantity?",
    answer:
      "Minimum order quantities vary by livestock type and destination. We work with both large-scale bulk importers and mid-size traders. Please contact us directly via WhatsApp or email to discuss your specific requirements and we will provide a tailored quotation.",
  },
  {
    question: "How long does the shipping process take?",
    answer:
      "Shipping timelines depend on the destination port and the size of the order. Typically, shipments to Saudi Arabia and the UAE take 3-5 days by sea from Berbera Port. We handle all export documentation, quarantine procedures, and logistics coordination to ensure timely delivery.",
  },
  {
    question: "How can I place an order or request a quote?",
    answer:
      "You can reach us through multiple channels: submit an enquiry via our contact form, email us at qabyotire99@gmail.com, call us on +252 063 4241477, or message us directly on WhatsApp. Our team responds to all enquiries within 24 hours.",
  },
  {
    question: "Do you offer competitive pricing for bulk orders?",
    answer:
      "Yes, we offer volume-based pricing for bulk and recurring orders. As a direct source from Somaliland's pastoral regions, we eliminate middlemen and provide competitive rates while maintaining the highest quality standards. Contact us for a personalised quote.",
  },
  {
    question: "How do you ensure animal welfare during transport?",
    answer:
      "Animal welfare is a core priority. We use modern livestock vessels with proper ventilation, feeding, and watering facilities. Our experienced handlers accompany every shipment to ensure the animals arrive in healthy condition. We comply with all international animal welfare standards.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            Everything you need to know about ordering and importing livestock from Qabyo-Tire Trading Company
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-foreground hover:no-underline hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
