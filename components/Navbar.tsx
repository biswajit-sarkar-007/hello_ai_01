"use client";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
  SignedOut,
  SignedIn,
  useAuth,
} from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";



export default function Navbar() {
  const { userId } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" />
          <Link href="/" className="text-lg md:text-xl font-medium text-gray-900 select-none tracking-tight" aria-label="Hello AI home">
            Hello AI
          </Link>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center items-center space-x-4 lg:space-x-6">
          {/* Show Dashboard only if signed in */}
          <SignedIn>
            <Link
              key="Dashboard"
              href="/generate"
              className="relative text-gray-700 font-medium px-2 py-1 text-base lg:text-lg transition group"
            >
              Dashboard
              <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </SignedIn>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-gray-700 font-medium px-2 py-1 text-base lg:text-lg transition group"
            >
              {link.name}
              <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>
        {/* Auth */}
        <div className="hidden md:flex items-center space-x-2">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-gray-700 hover:text-indigo-600 px-2 py-1 font-medium bg-transparent border-none cursor-pointer">Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-2 font-medium transition">Sign Up</button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{ elements: { avatarBox: "w-9 h-9" } }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none border border-gray-200 bg-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-none md:hidden animate-fade-in z-50">
            <div className="flex flex-col items-center space-y-2 py-4">
              <SignedIn>
                <Link
                  key="Dashboard-mobile"
                  href="/generate"
                  className="text-gray-900 text-lg font-semibold w-full text-center py-2 rounded hover:bg-indigo-50 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </SignedIn>
              {navLinks.map((link) => (
                <Link
                  key={link.name + "-mobile"}
                  href={link.href}
                  className="text-gray-700 font-medium px-4 py-2 w-full text-center hover:text-indigo-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col w-full space-y-2 mt-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full text-gray-700 hover:text-indigo-600 px-2 py-2 font-medium bg-transparent border border-gray-300 rounded transition">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-4 py-2 font-medium transition">Sign Up</button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} afterSignOutUrl="/" />
                  <div className="mt-2">
                    <SignOutButton>
                      <button className="w-full text-red-600 font-medium py-2 rounded hover:bg-red-50 transition">Sign Out</button>
                    </SignOutButton>
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
  