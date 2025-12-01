"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLibrary } from "@/lib/library-context"
import { PlusCircle, Loader2, ImageIcon } from "lucide-react"

const DEFAULT_BOOK_COVER = "https://via.placeholder.com/280x400/e2e8f0/64748b?text=No+Cover"

export function AddBookForm() {
  const router = useRouter()
  const { addBook } = useLibrary()
  const [isLoading, setIsLoading] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    description: "",
    coverImage: "",
    totalCopies: 1,
    publishedYear: new Date().getFullYear(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    addBook({
      ...formData,
      availableCopies: formData.totalCopies,
      coverImage: formData.coverImage || DEFAULT_BOOK_COVER,
    })

    setIsLoading(false)
    router.push("/dashboard/books")
  }

  const handleCoverImageChange = (url: string) => {
    setImgError(false)
    setFormData((prev) => ({ ...prev, coverImage: url }))
  }

  return (
    <Card className="max-w-2xl mx-auto border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5 text-primary" />
          Add New Book
        </CardTitle>
        <CardDescription>Fill in the details below to add a new book to the library</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title *</Label>
              <Input
                id="title"
                placeholder="Enter book title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author *</Label>
              <Input
                id="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                placeholder="978-0000000000"
                value={formData.isbn}
                onChange={(e) => setFormData((prev) => ({ ...prev, isbn: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                placeholder="e.g., Fiction, Science, History"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="publishedYear">Published Year</Label>
              <Input
                id="publishedYear"
                type="number"
                min="1000"
                max={new Date().getFullYear()}
                value={formData.publishedYear}
                onChange={(e) => setFormData((prev) => ({ ...prev, publishedYear: Number.parseInt(e.target.value) }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalCopies">Total Copies *</Label>
              <Input
                id="totalCopies"
                type="number"
                min="1"
                value={formData.totalCopies}
                onChange={(e) => setFormData((prev) => ({ ...prev, totalCopies: Number.parseInt(e.target.value) }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              placeholder="https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg"
              value={formData.coverImage}
              onChange={(e) => handleCoverImageChange(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Tip: Use Open Library covers - format: https://covers.openlibrary.org/b/isbn/[ISBN]-L.jpg
            </p>

            {/* Cover Image Preview */}
            {formData.coverImage && (
              <div className="mt-3 flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted border">
                  {!imgError ? (
                    <img
                      src={formData.coverImage || "/placeholder.svg"}
                      alt="Cover preview"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  <p className="font-medium">Cover Preview</p>
                  {imgError ? (
                    <p className="text-destructive text-xs">Failed to load image. Please check the URL.</p>
                  ) : (
                    <p className="text-muted-foreground text-xs">Image loaded successfully</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter a brief description of the book..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding Book...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Book to Library
              </>
            )}
          </Button>
        </CardContent>
      </form>
    </Card>
  )
}