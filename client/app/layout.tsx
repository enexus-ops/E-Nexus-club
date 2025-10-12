import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet our amazing team",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans bg-black text-white antialiased">
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
