import Image from 'next/image'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

import { LogoImage } from '@/components/images/LogoImage'
import { Button } from '@/components/ui/common/Button'
import {
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'
import { Card } from '@/components/ui/common/Card'

interface AuthWrapperProps extends PropsWithChildren {
	heading: string
	backButtonLabel?: string
	backButtonHref?: string
}

export function AuthWrapper({
	children,
	heading,
	backButtonLabel,
	backButtonHref
}: AuthWrapperProps) {
	return (
		<div className='flex h-full items-center justify-center'>
			<Card className='w-[550px]'>
				<CardHeader className='flex flex-row items-center justify-center gap-x-4'>
					<LogoImage />
					<CardTitle>{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter>
					{backButtonLabel && backButtonHref && (
						<Button variant='ghost' className='w-full'>
							<Link href={backButtonHref}>{backButtonLabel}</Link>
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
