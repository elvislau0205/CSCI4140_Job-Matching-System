import Navbar from "../components/Navbar"
import "./globals.css"
import { Poppins } from 'next/font/google';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: '400',
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <Navbar />
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}
