"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLibrary } from "@/lib/library-context"
import type { Book } from "@/lib/types"
import { BookOpen, Trash2, Calendar } from "lucide-react"
import { useState } from "react"

const DEFAULT_BOOK_COVER = "https://via.placeholder.com/280x400/e2e8f0/64748b?text=No+Cover"

interface BookCardProps {
  book: Book
  showActions?: boolean
  showDelete?: boolean
}

export function BookCard({ book, showActions = true, showDelete = false }: BookCardProps) {
  const { borrowBook, deleteBook, authState } = useLibrary()
  const [isLoading, setIsLoading] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleBorrow = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    borrowBook(book.id)
    setIsLoading(false)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBook(book.id)
    }
  }

  const isAvailable = book.availableCopies > 0
  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "librarian"

  return (
    <Card className="group overflow-hidden border-border/50 transition-all hover:shadow-lg hover:border-primary/20">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={imgError ? DEFAULT_BOOK_COVER : book.coverImage || DEFAULT_BOOK_COVER}
          alt={book.title}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={isAvailable ? "default" : "secondary"} className="shadow-md">
            {isAvailable ? `${book.availableCopies} available` : "Unavailable"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="font-normal">
            {book.category}
          </Badge>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {book.publishedYear}
          </span>
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button className="flex-1" disabled={!isAvailable || isLoading} onClick={handleBorrow}>
            <BookOpen className="mr-2 h-4 w-4" />
            {isLoading ? "Borrowing..." : "Borrow"}
          </Button>
          {showDelete && isAdmin && (
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
