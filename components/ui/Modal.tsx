'use client'

import { ReactNode, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Halftone overlay instead of plain dim */}
      <div
        className="absolute inset-0 cursor-pointer"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.6) 1px, transparent 1px)',
          backgroundSize: '6px 6px',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
        onClick={onClose}
      />

      <div className="relative z-10 bg-white border-4 border-pop-black shadow-[12px_12px_0px_#000] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-4 border-pop-black bg-secondary">
          {title && (
            <h2 className="font-anton text-xl uppercase tracking-wide">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto font-mono font-bold text-pop-black border-4 border-pop-black bg-white px-3 py-1 hover:bg-primary hover:translate-x-[2px] hover:translate-y-[2px] transition-all shadow-[3px_3px_0px_#000] hover:shadow-[1px_1px_0px_#000]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
