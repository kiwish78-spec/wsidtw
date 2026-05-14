'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  tilt?: boolean
}

const variantStyles = {
  primary: 'bg-primary text-pop-black border-4 border-pop-black shadow-pop hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]',
  secondary: 'bg-secondary text-pop-black border-4 border-pop-black shadow-pop hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]',
  tertiary: 'bg-tertiary text-pop-black border-4 border-pop-black shadow-pop hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]',
  outline: 'bg-transparent text-pop-black border-4 border-pop-black shadow-pop hover:bg-secondary hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000]',
}

const sizeStyles = {
  sm: 'px-4 py-2 text-sm font-mono font-bold tracking-widest uppercase',
  md: 'px-6 py-3 text-base font-mono font-bold tracking-widest uppercase',
  lg: 'px-8 py-4 text-lg font-mono font-bold tracking-widest uppercase',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', tilt = false, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          inline-block transition-all duration-100 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${tilt ? 'rotate-[-1deg]' : ''}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
