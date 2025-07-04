import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/utils/tw-merge'

const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<'input'>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					`flex h-10 w-full rounded-md border 
                    border-border bg-input px-3 py-2 
                    text-sm file:border-0 
                    file:bg-transparent file:text-sm file:font-medium 
                    file:text-foreground placeholder:text-muted-foreground 
                    focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 
                    focus:border-primary`,
					className
				)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = 'Input'

export { Input }
