"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLibrary } from "@/lib/library-context"
import { Button } from "@/components/ui/button"
import { BookOpen, LayoutDashboard, Search, PlusCircle, BookMarked, LogOut, User, Library } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/books", label: "Browse Books", icon: Library },
  { href: "/dashboard/search", label: "Search", icon: Search },
  { href: "/dashboard/my-books", label: "My Books", icon: BookMarked },
]

const adminItems = [{ href: "/dashboard/add-book", label: "Add Book", icon: PlusCircle }]

export function DashboardNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { authState, logout } = useLibrary()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const isAdmin = authState.user?.role === "admin" || authState.user?.role === "librarian"

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border/50 bg-card">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border/50 px-6">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">LibraryHub</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}

          {isAdmin && (
            <>
              <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Admin
              </p>
              {adminItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* User Section */}
        <div className="border-t border-border/50 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{authState.user?.name}</p>
              <p className="truncate text-xs text-muted-foreground capitalize">{authState.user?.role}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="mt-2 w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  )
}
