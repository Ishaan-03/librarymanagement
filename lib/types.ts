export interface User {
  id: number
  email: string
  name: string
  role: "admin" | "librarian" | "member"
  createdAt: Date
}

export interface Book {
  id: number
  title: string
  author: string
  isbn: string
  category: string
  description: string
  coverImage: string
  totalCopies: number
  availableCopies: number
  publishedYear: number
  createdAt: Date
}

export interface Borrowing {
  id: number
  userId: number
  bookId: number
  borrowedAt: Date
  dueDate: Date
  returnedAt: Date | null
  status: "borrowed" | "returned" | "overdue"
  book?: Book
  user?: User
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}
