import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Topbar from '@/components/shared/Topbar'
import Leftsidebar from '@/components/shared/Leftsidebar'
import Rightsidebar from '@/components/shared/Rightsidebar'
import Bottombar from '@/components/shared/Bottombar'

const inter = Inter({ subsets: ['latin'] })

//it chnages the create next app in the bar tab bar to the threads .
export const metadata: Metadata = {
  title: 'Threads',
  description: 'threads metadata next js toy application ',
  };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Topbar/>
       <main>
         <Leftsidebar/>
           <section className='main-container'>
             <div className="w-full max-w-4xl">
              {children}
             </div>
           </section>
         <Rightsidebar/>
       </main>
     <Bottombar/>
     </body>
    </html>
    </ClerkProvider>
  )
}
