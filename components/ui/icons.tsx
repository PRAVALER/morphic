'use client'

import { cn } from '@/lib/utils'

function IconLogo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-4 w-4', className)}
      {...props}
    >
      <circle cx="128" cy="128" r="128" fill="darkorange" />
      <circle cx="102" cy="128" r="18" fill="white" />
      <circle cx="154" cy="128" r="18" fill="white" />
    </svg>
  )
}

export { IconLogo }
