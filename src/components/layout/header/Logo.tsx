'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
	const t = useTranslations('layout.header.logo')
	return (
		<Link href='/' className='flex items-center gap-x-4 transition-opacity hover:opacity-75'>
			<Image src='/images/logo.svg' alt='logo' width={35} height={35} />
			<div className='hidden leading-tight lg:block'>
				<h1 className='text-lg font-semibold tracking-wider text-accent-foreground'>R-Stream</h1>
				<p className='text-sm text-muted-foreground'>{t('platform')}</p>
			</div>
		</Link>
	)
}
