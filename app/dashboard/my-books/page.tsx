import { MyBorrowings } from "@/components/my-borrowings"
import { BookMarked } from "lucide-react"

export default function MyBooksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <BookMarked className="h-8 w-8 text-primary" />
          My Books
        </h1>
        <p className="text-muted-foreground mt-1">Manage your borrowed books and returns</p>
      </div>

      <MyBorrowings />
    </div>
  )
}
