"use client"

import { useLibrary } from "@/lib/library-context"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, BookMarked, TrendingUp } from "lucide-react"

export function DashboardStats() {
  const { books, borrowings, getUserBorrowings } = useLibrary()

  const totalBooks = books.length
  const totalAvailable = books.reduce((acc, book) => acc + book.availableCopies, 0)
  const activeBorrowings = borrowings.filter((b) => b.status === "borrowed").length
  const myActiveBorrowings = getUserBorrowings().filter((b) => b.status === "borrowed").length

  const stats = [
    {
      title: "Total Books",
      value: totalBooks,
      subtitle: `${totalAvailable} copies available`,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Active Loans",
      value: activeBorrowings,
      subtitle: "Books currently borrowed",
      icon: BookMarked,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "My Books",
      value: myActiveBorrowings,
      subtitle: "Your active borrowings",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Categories",
      value: new Set(books.map((b) => b.category)).size,
      subtitle: "Book categories",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}