import { type PropsWithChildren } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../common/Tooltip'

interface HintProps {
	label: string
	asChild?: boolean
	side?: 'top' | 'right' | 'bottom' | 'left'
	align?: 'start' | 'center' | 'end'
}

export default function Hint({
	children,
	label,
	asChild,
	side = 'bottom',
	align = 'start'
}: PropsWithChildren<HintProps>) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent side={side} align={align} className='dark:bg-white text-white dark:text-[#1f2128] bg-[#1f2128]'> 
					<p className='font-semibold text-muted-foreground'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
