import Image from 'next/image'
import { Inter } from 'next/font/google'
import App from "../../packages/reactour/src/demo/App"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container"><App></App></div>
    </main>
  )
}
