'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-pop-black border-b-4 border-pop-black">
      <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-anton text-2xl text-secondary tracking-widest uppercase hover:text-primary transition-colors"
          style={{ textShadow: '2px 2px 0px #FF00FF' }}
        >
          WSIDTW
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/#about"
            className="font-mono text-sm font-bold uppercase tracking-widest text-white hover:text-secondary transition-colors"
          >
            Who We Are
          </Link>
          <Link
            href="/#events"
            className="font-mono text-sm font-bold uppercase tracking-widest text-white hover:text-secondary transition-colors"
          >
            Events
          </Link>
          <Link
            href="/register"
            className="font-mono text-sm font-bold uppercase tracking-widest bg-primary text-white border-4 border-secondary px-4 py-2 shadow-[3px_3px_0px_#FAFF00] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_#FAFF00] transition-all"
          >
            Request Invite
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden font-mono font-bold text-secondary border-2 border-secondary px-3 py-1 text-sm"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕ CLOSE' : '☰ MENU'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-pop-black border-t-4 border-secondary px-4 py-6 flex flex-col gap-4">
          <Link
            href="/#about"
            className="font-mono text-sm font-bold uppercase tracking-widest text-white hover:text-secondary"
            onClick={() => setMenuOpen(false)}
          >
            Who We Are
          </Link>
          <Link
            href="/#events"
            className="font-mono text-sm font-bold uppercase tracking-widest text-white hover:text-secondary"
            onClick={() => setMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/register"
            className="font-mono text-sm font-bold uppercase tracking-widest bg-primary text-white border-4 border-secondary px-4 py-3 shadow-[3px_3px_0px_#FAFF00] text-center"
            onClick={() => setMenuOpen(false)}
          >
            Request Invite
          </Link>
        </div>
      )}
    </nav>
  )
}
