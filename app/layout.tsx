import type React from "react"
import type { Metadata } from "next"
import { Domine, Inter, Open_Sans } from "next/font/google"
import "./globals.css"

const domine = Domine({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-domine",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-inter",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "Manjunath Portfolio Website",
  description: "Manjunath's interactive terminal-style portfolio website",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const fontVariables = `${domine.variable} ${inter.variable} ${openSans.variable}`

  return (
    <html lang="en" className={fontVariables}>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
