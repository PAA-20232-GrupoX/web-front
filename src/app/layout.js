import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({ weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'PAA 4',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
