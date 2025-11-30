"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  submittedAt: string
  status: "new" | "read" | "responded"
}

export default function SubmissionsPage() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "new" | "read" | "responded">("all")
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    checkAuthAndFetchSubmissions()
  }, [])

  const checkAuthAndFetchSubmissions = async () => {
    try {
      const authRes = await fetch("/api/admin/auth")
      const authData = await authRes.json()

      if (!authData.authenticated) {
        router.push("/admin")
        return
      }

      fetchSubmissions()
    } catch (error) {
      console.error("[v0] Auth check error:", error)
      router.push("/admin")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/admin/submissions")
      const data = await res.json()
      setSubmissions(data.submissions || [])
    } catch (error) {
      console.error("[v0] Fetch submissions error:", error)
    }
  }

  const updateSubmissionStatus = async (id: string, status: ContactSubmission["status"]) => {
    try {
      const res = await fetch("/api/admin/submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })

      if (res.ok) {
        fetchSubmissions()
        if (selectedSubmission?.id === id) {
          setSelectedSubmission({ ...selectedSubmission, status })
        }
      }
    } catch (error) {
      console.error("[v0] Update status error:", error)
    }
  }

  const deleteSubmission = async (id: string) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      try {
        const res = await fetch("/api/admin/submissions", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        })

        if (res.ok) {
          fetchSubmissions()
          setSelectedSubmission(null)
        }
      } catch (error) {
        console.error("[v0] Delete error:", error)
      }
    }
  }

  const filteredSubmissions = submissions.filter((sub) => (filter === "all" ? true : sub.status === filter))

  const newCount = submissions.filter((s) => s.status === "new").length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
        <p className="text-emerald-700 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-900">Contact Submissions</h1>
          <p className="text-emerald-700 mt-1">
            {filteredSubmissions.length} submissions {newCount > 0 && `(${newCount} new)`}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-2">
            <Card className="border-emerald-200">
              <div className="p-4 border-b border-emerald-200 flex gap-2 flex-wrap">
                {(["all", "new", "read", "responded"] as const).map((status) => (
                  <Button
                    key={status}
                    onClick={() => setFilter(status)}
                    variant={filter === status ? "default" : "outline"}
                    className={filter === status ? "bg-emerald-600 text-white" : "border-emerald-300 text-emerald-700"}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>

              <div className="divide-y divide-emerald-200">
                {filteredSubmissions.length === 0 ? (
                  <div className="p-8 text-center text-emerald-600">No submissions found</div>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      onClick={() => setSelectedSubmission(submission)}
                      className={`p-4 cursor-pointer hover:bg-emerald-50 transition ${
                        selectedSubmission?.id === submission.id ? "bg-emerald-100" : ""
                      } ${submission.status === "new" ? "border-l-4 border-l-emerald-600" : ""}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-emerald-900">{submission.name}</h3>
                          <p className="text-sm text-emerald-700">{submission.email}</p>
                          <p className="text-xs text-emerald-600 mt-1 line-clamp-1">{submission.message}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              submission.status === "new"
                                ? "bg-blue-100 text-blue-800"
                                : submission.status === "read"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {submission.status.toUpperCase()}
                          </span>
                          <p className="text-xs text-emerald-600 mt-2">
                            {new Date(submission.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Detail View */}
          <div>
            {selectedSubmission ? (
              <Card className="border-emerald-200 p-6 sticky top-6">
                <h2 className="text-xl font-bold text-emerald-900 mb-4">Details</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-emerald-700 uppercase">Name</label>
                    <p className="text-emerald-900">{selectedSubmission.name}</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-emerald-700 uppercase">Email</label>
                    <a
                      href={`mailto:${selectedSubmission.email}`}
                      className="text-emerald-600 hover:underline break-all"
                    >
                      {selectedSubmission.email}
                    </a>
                  </div>

                  {selectedSubmission.phone && (
                    <div>
                      <label className="text-xs font-semibold text-emerald-700 uppercase">Phone</label>
                      <a href={`tel:${selectedSubmission.phone}`} className="text-emerald-600 hover:underline">
                        {selectedSubmission.phone}
                      </a>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold text-emerald-700 uppercase">Date</label>
                    <p className="text-emerald-900">{new Date(selectedSubmission.submittedAt).toLocaleString()}</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-emerald-700 uppercase">Status</label>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {(["new", "read", "responded"] as const).map((status) => (
                        <Button
                          key={status}
                          size="sm"
                          onClick={() => updateSubmissionStatus(selectedSubmission.id, status)}
                          variant={selectedSubmission.status === status ? "default" : "outline"}
                          className={
                            selectedSubmission.status === status
                              ? "bg-emerald-600"
                              : "border-emerald-300 text-emerald-700"
                          }
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-emerald-700 uppercase">Message</label>
                    <p className="text-emerald-900 text-sm whitespace-pre-wrap mt-2 bg-emerald-50 p-3 rounded max-h-48 overflow-y-auto">
                      {selectedSubmission.message}
                    </p>
                  </div>

                  <Button
                    onClick={() => deleteSubmission(selectedSubmission.id)}
                    variant="outline"
                    className="w-full border-red-300 text-red-700 hover:bg-red-50 mt-4"
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="border-emerald-200 p-6 text-center text-emerald-600">
                Select a submission to view details
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
