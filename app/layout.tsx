"use client"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import './globals.css'
import {Outfit}  from 'next/font/google'
import Navbar from '@/components/Navbar'

const outfit = Outfit({subsets:['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
          <Navbar/>
           
          </SignedIn>
          
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}