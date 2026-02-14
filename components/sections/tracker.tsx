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
  { key: "sheep" as const, label: "Sheep", delay: 0, fallback: 181075 },
  { key: "goats" as const, label: "Goats", delay: 150, fallback: 120525 },
  { key: "cattle" as const, label: "Cattle", delay: 300, fallback: 68850 },
  { key: "camels" as const, label: "Camels", delay: 450, fallback: 21725 },
]

export function Tracker() {
  const { data, isLoading, error } = useSWR<Stats>("/api/stats", fetcher, { refreshInterval: 15000 })

  return (
    <section id="tracker" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Live Export Data</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Total Livestock Exported & Delivered
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Real-time tracking of our livestock exports demonstrating our consistent delivery across Gulf markets since 2015.
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
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tabular-nums">
                  {isLoading ? (
                    <span className="inline-block h-10 w-28 animate-pulse rounded-lg bg-muted" />
                  ) : (
                    <AnimatedNumber value={data?.[item.key] ?? item.fallback} delay={item.delay} />
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Best Grade / Premium</span>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-24 w-24 bg-primary/[0.03] rounded-bl-[100px] group-hover:bg-primary/[0.06] transition-colors" />
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12">
          Verified shipments across Saudi Arabia, UAE, Qatar, Kuwait, Oman & Bahrain
        </p>
      </div>
    </section>
  )
}
