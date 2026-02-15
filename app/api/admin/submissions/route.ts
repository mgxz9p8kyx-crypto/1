import { NextResponse } from "next/server"
import { getSubmissions, addSubmission, updateSubmissionStatus as updateStatus, deleteSubmission } from "@/lib/submissions-store"

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
    submissions: getSubmissions(),
  })
}

export async function POST(request: Request) {
  if (!(await checkAuth(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { name, email, phone, company, country, message } = body

    const submission = addSubmission({
      name,
      email,
      phone,
      company,
      country,
      message,
    })

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

    const submission = updateStatus(id, status)
    if (!submission) {
      return NextResponse.json({ success: false, message: "Submission not found" }, { status: 404 })
    }

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

    const deleted = deleteSubmission(id)
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Submission not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, message: "Submission deleted" })
  } catch (error) {
    console.error("[v0] Delete error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}
