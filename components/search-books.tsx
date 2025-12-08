"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { useLibrary } from "@/lib/library-context"
import { BookCard } from "./book-card"
import { Search, BookX } from "lucide-react"

export function SearchBooks() {
const { searchBooks } = useLibrary()
const [query, setQuery] = useState("")

const results = useMemo(() => searchBooks(query), [searchBooks, query])

return (
<div className="space-y-6">
<div className="relative max-w-xl">
<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
<Input
placeholder="Search by title, author, category, or ISBN..."
value={query}
onChange={(e) => setQuery(e.target.value)}
className="pl-10 h-12"
/>
</div>

{query && (
<p className="text-sm text-muted-foreground">
Found {results.length} book{results.length !== 1 ? "s" : ""} for "{query}"
</p>
)}

{results.length > 0 ? (
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
{results.map((book) => (
<BookCard key={book.id} book={book} />
))}
</div>
) : query ? (
<div className="flex flex-col items-center justify-center py-16 text-center">
<BookX className="h-16 w-16 text-muted-foreground/50 mb-4" />
<h3 className="text-lg font-medium">No books found</h3>
<p className="text-sm text-muted-foreground mt-1">Try adjusting your search terms</p>
</div>
) : null}
</div>
)
}