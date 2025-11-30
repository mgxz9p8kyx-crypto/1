import { NextResponse } from "next/server"

interface StoredSubmission {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  submittedAt: string
  status: "new" | "read" | "responded"
}

// In-memory storage (replace with database in production)
let submissions: StoredSubmission[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+252 123 456 789",
    message: "Interested in bulk cattle export to UAE",
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "read",
  },
]

async function checkAuth(request: Request) {
  const cookieHeader = request.headers.get("cookie")
  return cookieHeader?.includes("admin_token") || false
}

export async function GET(request: Request) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.json({
    success: true,
    submissions: submissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()),
  })
}

export async function POST(request: Request) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    const submission: StoredSubmission = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      submittedAt: new Date().toISOString(),
      status: "new",
    }

    submissions.push(submission)

    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error("[v0] Submit error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, status } = body

    const submission = submissions.find((s) => s.id === id)
    if (!submission) {
      return NextResponse.json({ success: false, message: "Submission not found" }, { status: 404 })
    }

    submission.status = status
    return NextResponse.json({ success: true, submission })
  } catch (error) {
    console.error("[v0] Update error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id } = body

    submissions = submissions.filter((s) => s.id !== id)
    return NextResponse.json({ success: true, message: "Submission deleted" })
  } catch (error) {
    console.error("[v0] Delete error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}
