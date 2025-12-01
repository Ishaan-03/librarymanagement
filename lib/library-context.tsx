"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User, Book, Borrowing, AuthState } from "./types"
import { mockUsers, mockBooks, mockBorrowings } from "./mock-data"

interface LibraryContextType {
  // Auth
  authState: AuthState
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void

  // Books
  books: Book[]
  addBook: (book: Omit<Book, "id" | "createdAt">) => void
  deleteBook: (id: number) => void
  searchBooks: (query: string) => Book[]

  // Borrowings
  borrowings: Borrowing[]
  borrowBook: (bookId: number) => boolean
  returnBook: (borrowingId: number) => boolean
  getUserBorrowings: () => Borrowing[]
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined)

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  })
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [borrowings, setBorrowings] = useState<Borrowing[]>(mockBorrowings)

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // For demo: any password works, just check if email exists
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
      if (user) {
        setAuthState({ user, isAuthenticated: true })
        return true
      }
      return false
    },
    [users],
  )

  const signup = useCallback(
    async (email: string, password: string, name: string): Promise<boolean> => {
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        return false // Email already exists
      }

      const newUser: User = {
        id: users.length + 1,
        email,
        name,
        role: "member",
        createdAt: new Date(),
      }
      setUsers((prev) => [...prev, newUser])
      setAuthState({ user: newUser, isAuthenticated: true })
      return true
    },
    [users],
  )

  const logout = useCallback(() => {
    setAuthState({ user: null, isAuthenticated: false })
  }, [])

  const addBook = useCallback(
    (bookData: Omit<Book, "id" | "createdAt">) => {
      const newBook: Book = {
        ...bookData,
        id: books.length + 1,
        createdAt: new Date(),
      }
      setBooks((prev) => [...prev, newBook])
    },
    [books.length],
  )

  const deleteBook = useCallback((id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
    setBorrowings((prev) => prev.filter((b) => b.bookId !== id))
  }, [])

  const searchBooks = useCallback(
    (query: string): Book[] => {
      if (!query.trim()) return books
      const lowerQuery = query.toLowerCase()
      return books.filter(
        (book) =>
          book.title.toLowerCase().includes(lowerQuery) ||
          book.author.toLowerCase().includes(lowerQuery) ||
          book.category.toLowerCase().includes(lowerQuery) ||
          book.isbn.includes(query),
      )
    },
    [books],
  )

  const borrowBook = useCallback(
    (bookId: number): boolean => {
      if (!authState.user) return false

      const book = books.find((b) => b.id === bookId)
      if (!book || book.availableCopies <= 0) return false

      // Check if user already has this book borrowed
      const existingBorrowing = borrowings.find(
        (b) => b.bookId === bookId && b.userId === authState.user!.id && b.status === "borrowed",
      )
      if (existingBorrowing) return false

      // Update book available copies
      setBooks((prev) => prev.map((b) => (b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b)))

      // Create new borrowing
      const newBorrowing: Borrowing = {
        id: borrowings.length + 1,
        userId: authState.user.id,
        bookId,
        borrowedAt: new Date(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        returnedAt: null,
        status: "borrowed",
      }
      setBorrowings((prev) => [...prev, newBorrowing])
      return true
    },
    [authState.user, books, borrowings],
  )

  const returnBook = useCallback(
    (borrowingId: number): boolean => {
      const borrowing = borrowings.find((b) => b.id === borrowingId)
      if (!borrowing || borrowing.status !== "borrowed") return false

      // Update borrowing status
      setBorrowings((prev) =>
        prev.map((b) => (b.id === borrowingId ? { ...b, status: "returned" as const, returnedAt: new Date() } : b)),
      )

      // Update book available copies
      setBooks((prev) =>
        prev.map((b) => (b.id === borrowing.bookId ? { ...b, availableCopies: b.availableCopies + 1 } : b)),
      )
      return true
    },
    [borrowings],
  )

  const getUserBorrowings = useCallback((): Borrowing[] => {
    if (!authState.user) return []
    return borrowings
      .filter((b) => b.userId === authState.user!.id)
      .map((b) => ({
        ...b,
        book: books.find((book) => book.id === b.bookId),
      }))
  }, [authState.user, borrowings, books])

  return (
    <LibraryContext.Provider
      value={{
        authState,
        login,
        signup,
        logout,
        books,
        addBook,
        deleteBook,
        searchBooks,
        borrowings,
        borrowBook,
        returnBook,
        getUserBorrowings,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const context = useContext(LibraryContext)
  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider")
  }
  return context
}
