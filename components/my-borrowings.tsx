"use client"

import { useLibrary } from "@/lib/library-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookMarked, RotateCcw, Calendar, Clock, CheckCircle2 } from "lucide-react"

const DEFAULT_BOOK_COVER = "https://via.placeholder.com/64x96/e2e8f0/64748b?text=Book"

export function MyBorrowings() {
  const { getUserBorrowings, returnBook } = useLibrary()
  const borrowings = getUserBorrowings()

  const activeBorrowings = borrowings.filter((b) => b.status === "borrowed")
  const returnedBorrowings = borrowings.filter((b) => b.status === "returned")

  const handleReturn = (borrowingId: number) => {
    returnBook(borrowingId)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysRemaining = (dueDate: Date) => {
    const now = new Date()
    const due = new Date(dueDate)
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return diff
  }

  if (borrowings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <BookMarked className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium">No borrowed books</h3>
        <p className="text-sm text-muted-foreground mt-1">Start browsing and borrow your first book!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {activeBorrowings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Currently Borrowed ({activeBorrowings.length})
          </h2>
          <div className="grid gap-4">
            {activeBorrowings.map((borrowing) => {
              const daysRemaining = getDaysRemaining(borrowing.dueDate)
              const isOverdue = daysRemaining < 0
              return (
                <Card key={borrowing.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <img
                          src={borrowing.book?.coverImage || DEFAULT_BOOK_COVER}
                          alt={borrowing.book?.title || "Book"}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = DEFAULT_BOOK_COVER
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{borrowing.book?.title}</h3>
                        <p className="text-sm text-muted-foreground">{borrowing.book?.author}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Borrowed: {formatDate(borrowing.borrowedAt)}
                          </span>
                          <Badge variant={isOverdue ? "destructive" : "secondary"}>
                            {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days remaining`}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReturn(borrowing.id)}
                        className="flex-shrink-0"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Return
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {returnedBorrowings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Returned ({returnedBorrowings.length})
          </h2>
          <div className="grid gap-4">
            {returnedBorrowings.map((borrowing) => (
              <Card key={borrowing.id} className="border-border/50 bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted opacity-75">
                      <img
                        src={borrowing.book?.coverImage || DEFAULT_BOOK_COVER}
                        alt={borrowing.book?.title || "Book"}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = DEFAULT_BOOK_COVER
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{borrowing.book?.title}</h3>
                      <p className="text-sm text-muted-foreground">{borrowing.book?.author}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Returned: {formatDate(borrowing.returnedAt!)}
                        </span>
                      </div>
                    </div>
                    <Badge variant="outline" className="flex-shrink-0 text-green-600 border-green-600/30">
                      Returned
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
