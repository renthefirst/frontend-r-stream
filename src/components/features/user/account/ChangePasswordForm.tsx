'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import { Separator } from '@/components/ui/common/Separator'
import { Skeleton } from '@/components/ui/common/Skeleton'
import { FormWrapper } from '@/components/ui/elements/FormWrapper'

import { useChangePasswordMutation } from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	TypeChangePasswordSchema,
	changePasswordSchema
} from '@/schemas/user/change-password.schema'

export function ChangePasswordForm() {
	const t = useTranslations('dashboard.settings.account.password')
	const [showOldPassword, setShowOldPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)

	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<TypeChangePasswordSchema>({
		resolver: zodResolver(changePasswordSchema),
		values: {
			newPassword: '',
			oldPassword: ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangePasswordMutation({
		onCompleted() {
			refetch()
			form.reset()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid, isDirty } = form.formState

	function onSubmit(data: TypeChangePasswordSchema) {
		update({ variables: { data } })
	}

	return isLoadingProfile ? (
		<ChangePasswordFormSkeleton />
	) : (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
					<FormField
						control={form.control}
						name='oldPassword'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('oldPasswordLabel')}</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='********'
											disabled={isLoadingUpdate}
											type={showOldPassword ? 'text' : 'password'}
											{...field}
										/>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											disabled={!isDirty}
											className='absolute right-1 top-1/2 -translate-y-1/2'
											onClick={() =>
												setShowOldPassword(!showOldPassword)
											}
										>
											{showOldPassword ? (
												<EyeOff className='h-4 w-4 text-muted-foreground' />
											) : (
												<Eye className='h-4 w-4 text-muted-foreground' />
											)}
										</Button>
									</div>
								</FormControl>
								<FormDescription>
									{t('oldPasswordDescription')}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name='newPassword'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>{t('newPasswordLabel')}</FormLabel>
								<FormControl>
									<div className='relative'>
										<Input
											placeholder='********'
											disabled={isLoadingUpdate}
											type={showNewPassword ? 'text' : 'password'}
											{...field}
										/>
										<Button
											type='button'
											variant='ghost'
											size='icon'
											disabled={!isDirty}
											className='absolute right-2 top-1/2 -translate-y-1/2'
											onClick={() =>
												setShowNewPassword(!showNewPassword)
											}
										>
											{showNewPassword ? (
												<EyeOff className='h-4 w-4 text-muted-foreground' />
											) : (
												<Eye className='h-4 w-4 text-muted-foreground' />
											)}
										</Button>
									</div>
								</FormControl>
								<FormDescription>
									{t('newPasswordDescription')}
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<div className='flex justify-end p-5'>
						<Button disabled={!isValid || !isDirty || isLoadingUpdate}>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}
export function ChangePasswordFormSkeleton() {
	return <Skeleton className='h-64 w-full' />
}
