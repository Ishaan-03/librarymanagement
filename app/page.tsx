import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Users, ArrowRight, CheckCircle } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">LibraryHub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            Your Modern Library Solution
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
            Manage Your Library
            <span className="text-primary"> Effortlessly</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            A comprehensive library management system that makes browsing, borrowing, and managing books a breeze.
            Perfect for libraries of any size.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Demo credentials: admin@library.com or member@library.com (any password)
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/50 bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Everything You Need</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              Powerful features to manage your entire library workflow
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Book Management</h3>
              <p className="mt-3 text-muted-foreground">
                Add, edit, and delete books with ease. Track copies and availability in real-time.
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Smart Search</h3>
              <p className="mt-3 text-muted-foreground">
                Find books instantly by title, author, category, or ISBN with our powerful search.
              </p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card p-8 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Borrow & Return</h3>
              <p className="mt-3 text-muted-foreground">
                Seamless borrowing and returning process with due date tracking and reminders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Choose LibraryHub?</h2>
              <p className="text-muted-foreground text-lg">
                Built with modern technology and designed for ease of use, LibraryHub streamlines every aspect of
                library management.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time inventory tracking",
                  "Role-based access control",
                  "Easy borrowing and returns",
                  "Comprehensive search functionality",
                  "Beautiful, intuitive interface",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-card p-6 shadow-lg border border-border/50">
                  <p className="text-4xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground mt-1">Books Managed</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow-lg border border-border/50">
                  <p className="text-4xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground mt-1">Active Members</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow-lg border border-border/50">
                  <p className="text-4xl font-bold text-primary">99%</p>
                  <p className="text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
                </div>
                <div className="rounded-xl bg-card p-6 shadow-lg border border-border/50">
                  <p className="text-4xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground mt-1">Access Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-semibold">LibraryHub</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 LibraryHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
