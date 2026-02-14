import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

    if (!adminEmail || !adminPasswordHash) {
      return NextResponse.json({ success: false, message: "Admin credentials not configured" }, { status: 500 })
    }

    if (email !== adminEmail) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    // Simple password check (in production, use proper hashing)
    const isValidPassword = password === atob(adminPasswordHash)

    if (!isValidPassword) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    const cookieStore = cookies()
    cookieStore.set("admin_token", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 86400 * 7, // 7 days
    })

    return NextResponse.json({
      success: true,
      message: "Logged in successfully",
    })
  } catch (error) {
    console.error("[v0] Auth error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("admin_token")

    if (!token) {
      return NextResponse.json({ success: false, authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ success: true, authenticated: true })
  } catch (error) {
    return NextResponse.json({ success: false, authenticated: false }, { status: 401 })
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies()
    cookieStore.delete("admin_token")
    return NextResponse.json({ success: true, message: "Logged out" })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 })
  }
}
