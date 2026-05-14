import { ReactNode } from 'react'

interface PopCardProps {
  children: ReactNode
  className?: string
  tilt?: 'left' | 'right' | 'none'
  accent?: 'pink' | 'yellow' | 'cyan' | 'none'
  tag?: string
}

const accentStyles = {
  pink: 'border-primary',
  yellow: 'border-secondary',
  cyan: 'border-tertiary',
  none: 'border-pop-black',
}

const shadowStyles = {
  pink: 'shadow-pop-pink',
  yellow: 'shadow-pop-yellow',
  cyan: 'shadow-pop-cyan',
  none: 'shadow-pop',
}

const tiltStyles = {
  left: 'rotate-[-1deg]',
  right: 'rotate-[1.5deg]',
  none: '',
}

export default function PopCard({
  children,
  className = '',
  tilt = 'none',
  accent = 'none',
  tag,
}: PopCardProps) {
  return (
    <div
      className={`
        relative bg-white border-4 p-6
        ${accentStyles[accent]}
        ${shadowStyles[accent]}
        ${tiltStyles[tilt]}
        ${className}
      `}
    >
      {tag && (
        <div className="absolute -top-3 -right-3 bg-secondary border-4 border-pop-black px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider shadow-[2px_2px_0px_#000] rotate-[3deg] z-10">
          {tag}
        </div>
      )}
      {children}
    </div>
  )
}
