'use client'

import { useTranslations } from 'next-intl'

import { Skeleton } from '@/components/ui/common/Skeleton'
import { CardContainer } from '@/components/ui/elements/CardContainer'

import { useCurrent } from '@/hooks/useCurrent'

import { DisableTOTP } from './DisableTOTP'
import { EnableTOTP } from './EnableTOTP'

export function WrapperTOTP() {
	const t = useTranslations('dashboard.settings.account.twoFactor')

	const { user, isLoadingProfile } = useCurrent()
	return isLoadingProfile ? (
		<WrapperTOTPSkeleton />
	) : (
		<CardContainer
			heading={t('heading')}
			description={t('description')}
			rightContent={
				<div className='flex items-center'>
					{user?.isTotpEnabled ? <DisableTOTP /> : <EnableTOTP />}
				</div>
			}
		></CardContainer>
	)
}
function WrapperTOTPSkeleton() {
	return <Skeleton className='h-24 w-full' />
}
