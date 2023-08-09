// it is a layout for the authentication things which has its own seo and it alo implements the clerk and also has its google font Inter
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'

// for the seo 
export const metadata: Metadata = {
title: 'Threads',
description: 'threads metadata next js toy application ',
};

//fonts 

 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // use the clerk provider for the authentication .. just copied from the official docs lol!
   
    <html lang="en">
      <body className={`${inter.className} bg-dark-1`}>{children}</body>
    </html>
  
  )
}