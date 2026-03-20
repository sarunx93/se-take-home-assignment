import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { McDonaldsOrderProvider } from './_contexts/order-context'

export const metadata: Metadata = {
    title: 'FeedMe Order Controller',
    description: 'Next.js, TypeScript, and Tailwind starter for the FeedMe take-home assignment.',
}

type RootLayoutProps = Readonly<{
    children: ReactNode
}>

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang='en'>
            <body>
                <McDonaldsOrderProvider>{children}</McDonaldsOrderProvider>
            </body>
        </html>
    )
}
