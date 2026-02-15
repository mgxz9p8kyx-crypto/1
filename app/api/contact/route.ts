import { NextResponse } from "next/server"
import { addSubmission } from "@/lib/submissions-store"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, company, country, message } = body

    if (!fullName || !email || !message) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Save to admin submissions store
    const submission = addSubmission({
      name: fullName,
      email,
      phone,
      company,
      country,
      message,
    })

    const sgApiKey = process.env.SENDGRID_API_KEY
    const fromEmail = process.env.FROM_EMAIL || "noreply@qabyotire.com"
    const contactEmail = process.env.CONTACT_EMAIL || "qabyotire99@gmail.com"

    if (!sgApiKey) {
      console.error("[v0] SendGrid API key not configured")
      // Fallback: log to console for development
      console.log("Contact form submission saved:", { id: submission.id, name: fullName, email, phone, company, country, message })
      return NextResponse.json({
        success: true,
        message: "Message saved and logged (SendGrid not configured). You will receive a response shortly.",
        isDev: true,
        submissionId: submission.id,
      })
    }

    // Send email via SendGrid
    const emailPayload = {
      personalizations: [
        {
          to: [{ email: contactEmail }],
          subject: `New Contact Form Submission from ${fullName}`,
        },
      ],
      from: { email: fromEmail },
      content: [
        {
          type: "text/html",
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</p>
            <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
            <p><strong>Country:</strong> ${escapeHtml(country || "Not provided")}</p>
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
          `,
        },
      ],
    }

    const sendGridResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sgApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    if (!sendGridResponse.ok) {
      const error = await sendGridResponse.text()
      console.error("[v0] SendGrid error:", {
        status: sendGridResponse.status,
        statusText: sendGridResponse.statusText,
        error: error,
        apiKeyExists: !!sgApiKey,
        apiKeyPrefix: sgApiKey?.substring(0, 3),
        fromEmail: fromEmail,
      })
      return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. We will contact you soon!",
      submissionId: submission.id,
    })
  } catch (error) {
    console.error("[v0] Contact API error:", error)
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 })
  }
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
