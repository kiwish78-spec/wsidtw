'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="font-mono font-bold text-sm uppercase tracking-widest text-pop-black"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3
            font-archivo text-pop-black text-base
            bg-white
            border-4 border-pop-black
            focus:outline-none focus:border-primary focus:bg-[#e0fffe]
            placeholder:text-gray-400
            transition-colors duration-100
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <span className="font-mono text-xs text-red-600 font-bold">{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
