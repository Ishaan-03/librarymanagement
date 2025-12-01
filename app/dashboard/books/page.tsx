"use client"

import { useLibrary } from "@/lib/library-context"
import { BookCard } from "@/components/book-card"
import { Library } from "lucide-react"

export default function BooksPage() {
  const { books, authState } = useLibrary()
  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "librarian"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Library className="h-8 w-8 text-primary" />
          Book Catalog
        </h1>
        <p className="text-muted-foreground mt-1">Browse our collection of {books.length} books</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} showDelete={isAdmin} />
        ))}
      </div>
    </div>
  )
}
