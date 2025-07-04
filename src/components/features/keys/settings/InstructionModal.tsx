import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/components/ui/common/Button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'
import { Separator } from '@/components/ui/common/Separator'

export function InstructionModal() {
	const t = useTranslations('dashboard.keys.instructionModal')

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='secondary'>{t('trigger')}</Button>
			</DialogTrigger>
			<DialogContent className='max-h-[80vh] max-w-[1000px] overflow-y-auto p-20'>
				<DialogHeader>
					<DialogTitle className='text-xl'>{t('heading')}</DialogTitle>
					<DialogDescription className='text-sm text-muted-foreground'>
						{t('description')}
					</DialogDescription>
				</DialogHeader>

				<Separator className='my-7' />

				<h2 className='text-lg font-semibold'>{t('step1Title')}</h2>
				<p className='text-sm text-muted-foreground'>{t('step1Description')}</p>

				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('downloadObs')}</strong>
						<br />
						{t('downloadObsDescription')}{' '}
						<Link
							href='https://obsproject.com'
							className='text-primary/90 underline hover:text-primary/70'
							target='_blank'
							rel='noopener noreferrer'
						>
							{t('obsLinkText')}
						</Link>
						.
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('copyKeys')}</strong>
						<br />
						{t('copyKeysDescription')}
					</li>
				</ol>

				<Separator className='my-7' />
				<h2 className='text-lg font-semibold'>{t('step2Title')}</h2>
				<p className='text-sm text-muted-foreground'>{t('step2Description')}</p>

				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('openObs')}</strong>
						<br />
						{t('openObsDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('openStreamSettings')}</strong>
						<br />
						{t('openStreamSettingsDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('enterDetails')}</strong>
						<br />
						{t('enterDetailsDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('saveSettings')}</strong>
						<br />
						{t('saveSettingsDescription')}
					</li>
				</ol>

				<Separator className='my-7' />

				<h2 className='text-lg font-semibold'>{t('step3Title')}</h2>
				<p className='text-sm text-muted-foreground'>{t('step3Description')}</p>

				<ol className='list-inside list-decimal space-y-2 pl-4'>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('startStream')}</strong>
						<br />
						{t('startStreamDescription')}
					</li>
					<li className='text-sm text-muted-foreground'>
						<strong>{t('monitorStream')}</strong>
						<br />
						{t('monitorStreamDescription')}
					</li>
				</ol>

				<p className='text-sm text-muted-foreground'>{t('congrats')}</p>

				<DialogFooter className='mt-10'>
					<DialogClose asChild>
						<Button variant='secondary'>{t('close')}</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
