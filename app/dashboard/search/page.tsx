import { SearchBooks } from "@/components/search-books"
import { Search } from "lucide-react"

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Search className="h-8 w-8 text-primary" />
          Search Books
        </h1>
        <p className="text-muted-foreground mt-1">Find the perfect book for your next read</p>
      </div>

      <SearchBooks />
    </div>
  )
}
