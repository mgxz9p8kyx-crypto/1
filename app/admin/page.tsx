"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    cattle: 68850,
    goats: 120525,
    sheep: 181075,
    camels: 21725,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth")
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
      if (data.authenticated) {
        fetchStats()
      }
    } catch (error) {
      console.error("[v0] Auth check error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats")
      const data = await res.json()
      setStats(data)
    } catch (error) {
      console.error("[v0] Fetch stats error:", error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (data.success) {
        setIsAuthenticated(true)
        setEmail("")
        setPassword("")
        fetchStats()
      } else {
        setError(data.message || "Login failed")
      }
    } catch (error) {
      setError("An error occurred during login")
      console.error("[v0] Login error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      setIsAuthenticated(false)
    } catch (error) {
      console.error("[v0] Logout error:", error)
    }
  }

  const handleUpdateStats = async () => {
    setIsSaving(true)

    try {
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      })

      const data = await res.json()

      if (data.success) {
        alert("Livestock statistics updated successfully!")
      } else {
        alert("Failed to update statistics")
      }
    } catch (error) {
      alert("An error occurred while updating")
      console.error("[v0] Update error:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
        <p className="text-emerald-700 text-lg">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
        <Card className="w-full max-w-md p-8 border-emerald-200">
          <h1 className="text-3xl font-bold text-emerald-900 mb-2">Admin Login</h1>
          <p className="text-emerald-700 mb-6">Qabyo-Tire Trading Company</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@qabyotire.com"
                disabled={isSaving}
                className="border-emerald-300 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-900 mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                disabled={isSaving}
                className="border-emerald-300 focus:border-emerald-500"
              />
            </div>

            {error && <div className="p-3 bg-red-100 border border-red-300 rounded text-red-800 text-sm">{error}</div>}

            <Button type="submit" disabled={isSaving} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
              {isSaving ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-xs text-emerald-600 mt-4 text-center">Contact your administrator for credentials</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900">Admin Dashboard</h1>
            <p className="text-emerald-700 mt-1">Manage Qabyo-Tire Trading Company</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => router.push("/admin/submissions")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              View Submissions
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>

        <Card className="p-8 border-emerald-200">
          <h2 className="text-2xl font-bold text-emerald-900 mb-6">Livestock Export Statistics</h2>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mb-8">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <label className="block text-sm font-medium text-emerald-900 mb-2">Cattle</label>
              <Input
                type="number"
                value={stats.cattle}
                onChange={(e) => setStats({ ...stats, cattle: Number.parseInt(e.target.value) || 0 })}
                className="border-emerald-300 focus:border-emerald-500"
              />
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <label className="block text-sm font-medium text-emerald-900 mb-2">Goats</label>
              <Input
                type="number"
                value={stats.goats}
                onChange={(e) => setStats({ ...stats, goats: Number.parseInt(e.target.value) || 0 })}
                className="border-emerald-300 focus:border-emerald-500"
              />
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <label className="block text-sm font-medium text-emerald-900 mb-2">Sheep</label>
              <Input
                type="number"
                value={stats.sheep}
                onChange={(e) => setStats({ ...stats, sheep: Number.parseInt(e.target.value) || 0 })}
                className="border-emerald-300 focus:border-emerald-500"
              />
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <label className="block text-sm font-medium text-emerald-900 mb-2">Camels</label>
              <Input
                type="number"
                value={stats.camels}
                onChange={(e) => setStats({ ...stats, camels: Number.parseInt(e.target.value) || 0 })}
                className="border-emerald-300 focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleUpdateStats}
              disabled={isSaving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1"
            >
              {isSaving ? "Saving..." : "Update Statistics"}
            </Button>
            <Button
              onClick={fetchStats}
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 flex-1 bg-transparent"
            >
              Refresh
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-emerald-200 mt-6 bg-emerald-50">
          <h3 className="font-semibold text-emerald-900 mb-2">Setup Instructions</h3>
          <ul className="text-sm text-emerald-800 space-y-1 list-disc list-inside">
            <li>Add ADMIN_EMAIL and ADMIN_PASSWORD_HASH to environment variables</li>
            <li>Configure SENDGRID_API_KEY for contact form emails</li>
            <li>Deploy to Vercel and set environment variables in project settings</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
