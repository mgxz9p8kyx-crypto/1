"use client"

import useSWR from "swr"
import { Card } from "@/components/ui/card"
import { Zap } from "lucide-react"
import React from "react"

type Stats = {
  cattle: number
  goats: number
  sheep: number
  camels: number
}

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch stats")
    return res.json()
  })

function AnimatedNumber({ value, delay = 0 }: { value: number; delay?: number }) {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 2000
      const start = Date.now()

      const animate = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        setCount(Math.floor(value * progress))

        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return count.toLocaleString()
}

export function Tracker() {
  const { data, isLoading } = useSWR<Stats>("/api/stats", fetcher, {
    refreshInterval: 15000,
  })

  const stats = [
    { label: "Sheep", value: data?.sheep || 181075, icon: "🐑", order: 1, delay: 0 },
    { label: "Goats", value: data?.goats || 120525, icon: "🐐", order: 2, delay: 200 },
    { label: "Cattle", value: data?.cattle || 68850, icon: "🐄", order: 3, delay: 400 },
    { label: "Camels", value: data?.camels || 21725, icon: "🐪", order: 4, delay: 600 },
  ]

  // Sort to put sheep first (most prominent)
  const sortedStats = stats.sort((a, b) => a.order - b.order)

  return (
    <section id="tracker" className="py-32 bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-20 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-emerald-700">
            <Zap className="h-5 w-5" />
            Real-Time Tracking
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
            Livestock Exported & Delivered
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl leading-relaxed">
            2015–2025: A decade of consistent excellence in premium livestock exports. Real-time data of{" "}
            <strong>Qabyo-Tire Trading Company&apos;s</strong> best-grade animals delivered across Gulf markets.
          </p>
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700 bg-white px-5 py-2.5 rounded-full border-2 border-emerald-200 shadow-sm">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            Live System Status
          </div>
        </div>

        {/* Stats Grid - Premium Minimalist Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sortedStats.map((stat) => (
            <Card
              key={stat.label}
              className="border-2 border-emerald-200 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white overflow-hidden group"
            >
              {/* Top accent bar */}
              <div className="h-2 w-full bg-gradient-to-r from-emerald-500 to-emerald-600" />

              <div className="p-8 space-y-6">
                {/* Header with icon and label */}
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-slate-900">{stat.label}</h3>
                  <div className="text-5xl opacity-70 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300">
                    {stat.icon}
                  </div>
                </div>

                {/* Main count - larger and more prominent */}
                <div className="space-y-2">
                  <div className="text-6xl font-black text-emerald-700 tracking-tight font-mono">
                    {isLoading ? "—" : <AnimatedNumber value={stat.value} delay={stat.delay} />}
                  </div>
                </div>

                {/* Badge */}
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-700 pt-4 border-t-2 border-emerald-100">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  Best Grade • Premium Quality
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-12 border-t-2 border-emerald-200 text-center space-y-2">
          <p className="text-slate-700 font-medium">
            Verified shipments across Saudi Arabia, UAE, Qatar, Kuwait, Oman & Bahrain.
          </p>
          <p className="text-slate-600 text-sm">
            All livestock meet international health and quality standards. Real-time tracking ensures consistent
            delivery excellence.
          </p>
        </div>
      </div>
    </section>
  )
}
