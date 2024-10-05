"use client";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import "./globals.css";
import { Outfit } from "next/font/google";
import Navbar from "@/components/Navbar";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>
          <div className="h-screen flex flex-row justify-center items-center">
            <SignedOut>
              <div>
                <SignInButton>
                  <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <Navbar />
            </SignedIn>
          </div>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
