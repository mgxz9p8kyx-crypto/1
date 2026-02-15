export interface StoredSubmission {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  message: string
  submittedAt: string
  status: "new" | "read" | "responded"
}

// In-memory storage (replace with database in production)
export let submissions: StoredSubmission[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    phone: "+252 123 456 789",
    company: "Gulf Trading Ltd",
    country: "United Arab Emirates",
    message: "Interested in bulk cattle export to UAE",
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "read",
  },
]

export function addSubmission(submission: Omit<StoredSubmission, "id" | "submittedAt" | "status">): StoredSubmission {
  const newSubmission: StoredSubmission = {
    ...submission,
    id: Date.now().toString(),
    submittedAt: new Date().toISOString(),
    status: "new",
  }
  submissions.push(newSubmission)
  return newSubmission
}

export function getSubmissions(): StoredSubmission[] {
  return submissions.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
}

export function updateSubmissionStatus(id: string, status: StoredSubmission["status"]): StoredSubmission | null {
  const submission = submissions.find((s) => s.id === id)
  if (!submission) return null
  submission.status = status
  return submission
}

export function deleteSubmission(id: string): boolean {
  const index = submissions.findIndex((s) => s.id === id)
  if (index === -1) return false
  submissions.splice(index, 1)
  return true
}
