"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useLibrary } from "@/lib/library-context"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { authState } = useLibrary()

  useEffect(() => {
    if (!authState.isAuthenticated) {
      router.push("/login")
    }
  }, [authState.isAuthenticated, router])

  if (!authState.isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
