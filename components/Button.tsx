'use client'

import { ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'link'
  className?: string
  target?: string
  rel?: string
}

export default function Button({
  children,
  onClick,
  href,
  type = 'button',
  loading = false,
  disabled = false,
  variant = 'primary',
  className = '',
  target,
  rel,
}: ButtonProps) {
  const isDisabled = disabled || loading

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'px-8 py-3 text-base text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 md:py-4 md:text-lg md:px-10',
    secondary: 'px-4 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    link: 'px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 focus:ring-indigo-500',
  }

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={combinedClassName}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  )
}

