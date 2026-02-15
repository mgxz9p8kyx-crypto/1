"use client"

import useSWR from "swr"
import React from "react"

type Stats = { cattle: number; goats: number; sheep: number; camels: number }

const fetcher = (url: string) => fetch(url).then((r) => { if (!r.ok) throw new Error(); return r.json() })

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    const t = setTimeout(() => {
      const dur = 2000, start = Date.now()
      const tick = () => {
        const p = Math.min((Date.now() - start) / dur, 1)
        setCount(Math.floor(value * p))
        if (p < 1) requestAnimationFrame(tick); else setCount(value)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return <>{count.toLocaleString()}</>
}

const livestock = [
  {
    key: "sheep" as const,
    label: "Sheep",
    delay: 0,
    fallback: 181075,
    description: "Hardy breeds raised on open pastures",
    emoji: "🐑",
  },
  {
    key: "goats" as const,
    label: "Goats",
    delay: 150,
    fallback: 120525,
    description: "Premium quality from Somaliland rangelands",
    emoji: "🐐",
  },
  {
    key: "cattle" as const,
    label: "Cattle",
    delay: 300,
    fallback: 68850,
    description: "Best-grade, health-certified stock",
    emoji: "🐄",
  },
  {
    key: "camels" as const,
    label: "Camels",
    delay: 450,
    fallback: 21725,
    description: "Prized breeds for Gulf markets",
    emoji: "🐪",
  },
]

export function Tracker() {
  const { data, isLoading, error } = useSWR<Stats>("/api/stats", fetcher, { refreshInterval: 15000 })

  return (
    <section id="livestock" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Our Livestock</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Livestock Delivered with Pride
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every animal is carefully sourced, health-certified, and delivered with the highest standards of care -- building trust with Gulf buyers since 2015.
          </p>
          <div className={`inline-flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 ${
            error
              ? "text-destructive bg-destructive/5 border border-destructive/15"
              : "text-primary bg-primary/5 border border-primary/15"
          }`}>
            <span className="relative flex h-2.5 w-2.5">
              {error ? (
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive" />
              ) : (
                <>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </>
              )}
            </span>
            {error ? "System Offline - Using Cached Data" : "System Online"}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {livestock.map((item) => (
            <div
              key={item.key}
              className="group relative bg-card rounded-2xl border border-border p-6 md:p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 text-lg">
                {item.emoji}
              </div>
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider">{item.label}</p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary tabular-nums">
                  {isLoading ? (
                    <span className="inline-block h-10 w-28 animate-pulse rounded-lg bg-muted" />
                  ) : (
                    <AnimatedNumber value={data?.[item.key] ?? item.fallback} delay={item.delay} />
                  )}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-card border border-border p-6 md:p-8 flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div className="text-center md:text-left">
            <p className="text-base font-semibold text-foreground">Verified Across 6 Gulf Nations</p>
            <p className="text-sm text-muted-foreground mt-0.5">
              Every shipment to Saudi Arabia, United Arab Emirates, Qatar, Kuwait, Oman, and Bahrain meets strict health and quality certifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
