"use client"

import { useLibrary } from "@/lib/library-context"
import { DashboardStats } from "@/components/dashboard-stats"
import { BookCard } from "@/components/book-card"

export default function DashboardPage() {
  const { authState, books } = useLibrary()
  const recentBooks = books.slice(0, 4)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {authState.user?.name?.split(" ")[0]}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening in your library today</p>
      </div>

      <DashboardStats />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recently Added Books</h2>
          <a href="/dashboard/books" className="text-sm text-primary hover:underline">
            View all
          </a>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  )
}
