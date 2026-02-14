"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Send, Phone, Mail, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

const gulfCountries = ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Oman", "Bahrain", "Other"]

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: "", email: "", phone: "", company: "", country: "", message: "" },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      if (res.ok) {
        setIsSuccess(true)
        form.reset()
      } else {
        setError("Failed to send message. Please try again.")
      }
    } catch (err) {
      console.error("Error submitting form", err)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Interested in importing premium livestock? Fill out the form and our team will respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Headquarters</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Road 1, Central Business District, Hargeisa, Somaliland</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Email</h3>
                <a href="mailto:qabyotire99@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors mt-0.5 block">
                  qabyotire99@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Phone</h3>
                <a href="tel:+2520634241477" className="text-sm text-muted-foreground hover:text-primary transition-colors block mt-0.5">
                  +252 063 4241477
                </a>
                <a href="tel:+447951301222" className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                  +44 7951 301222 (UK)
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-6 md:p-8">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="h-14 w-14 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Message Sent</h3>
                <p className="text-muted-foreground text-sm">Thank you for contacting us. We will respond shortly.</p>
                <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>Send Another</Button>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="h-14 w-14 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Error</h3>
                <p className="text-muted-foreground text-sm">{error}</p>
                <Button variant="outline" size="sm" onClick={() => setError(null)}>Try Again</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Full Name</FormLabel>
                      <FormControl><Input placeholder="John Doe" className="h-11" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Email</FormLabel>
                        <FormControl><Input placeholder="john@company.com" className="h-11" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Phone</FormLabel>
                        <FormControl><Input placeholder="+966..." className="h-11" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Company</FormLabel>
                        <FormControl><Input placeholder="Trading Co." className="h-11" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="country" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-11"><SelectValue placeholder="Select" /></SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {gulfCountries.map((c) => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your livestock requirements..." className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSubmitting}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
