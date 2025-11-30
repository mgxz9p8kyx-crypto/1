import { NextResponse } from "next/server"

let livestockStats = {
  cattle: 68850,
  goats: 120525,
  sheep: 181075,
  camels: 21725,
}

export async function GET() {
  return NextResponse.json(livestockStats)
}

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie")
    const isAuthenticated = cookieHeader?.includes("admin_token")

    if (!isAuthenticated) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { cattle, goats, sheep, camels } = body

    // Validate inputs
    if (
      typeof cattle !== "number" ||
      typeof goats !== "number" ||
      typeof sheep !== "number" ||
      typeof camels !== "number"
    ) {
      return NextResponse.json({ success: false, message: "Invalid data types" }, { status: 400 })
    }

    // Update stats
    livestockStats = { cattle, goats, sheep, camels }

    return NextResponse.json({ success: true, data: livestockStats })
  } catch (error) {
    console.error("[v0] Stats update error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}
