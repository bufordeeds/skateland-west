import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Skateland West - San Antonio's Premier Family Skating Experience",
  description: "Experience the best roller skating in San Antonio! Birthday parties, open skating, private events, and skate lessons. Creating magical memories for families since 1985.",
  keywords: "roller skating, San Antonio, birthday parties, family fun, skating rink, private events, skate lessons",
  openGraph: {
    title: "Skateland West - San Antonio's Premier Family Skating Experience",
    description: "Book your unforgettable birthday party or join us for open skating! Family fun for all ages.",
    type: "website",
    locale: "en_US",
    siteName: "Skateland West",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skateland West - San Antonio's Premier Family Skating Experience",
    description: "Book your unforgettable birthday party or join us for open skating! Family fun for all ages.",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF6B6B",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
