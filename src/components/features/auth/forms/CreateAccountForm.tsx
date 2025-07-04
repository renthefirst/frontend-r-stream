'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/common/Alert'
import { Button } from '@/components/ui/common/Button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'

import { useCreateUserMutation } from '@/graphql/generated/output'

import { type TypeCreateAccountSchema, createAccountSchema } from '@/schemas/auth/create-account.schema'

import { AuthWrapper } from '../AuthWrapper'

export function CreateAccountForm() {
	const t  = useTranslations('auth.register')
	const [isSuccess, setIsSuccess] = useState(false)
	const form = useForm<TypeCreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const { isValid } = form.formState

	const [createUser, { loading }] = useCreateUserMutation({
		onCompleted() {
			setIsSuccess(true)
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	function onSubmit(data: TypeCreateAccountSchema) {
		createUser({ variables: { data } })
	}

	return (
		<AuthWrapper heading={t('heading')} backButtonHref='/account/login' backButtonLabel={t('backButtonLabel')}>
			{isSuccess ? (
				<Alert>
					<CheckCircleIcon className='size-4' />
					<AlertTitle>{t('successAlertTitle')}</AlertTitle>
					<AlertDescription>{t('successAlertDescription')}</AlertDescription>
				</Alert>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-y-3'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('usernameLabel')}</FormLabel>
									<FormControl>
										<Input {...field} placeholder='john_doe' disabled={loading} />
									</FormControl>
									<FormDescription>{t('usernameDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('emailLabel')}</FormLabel>
									<FormControl>
										<Input {...field} placeholder='example@email.com' disabled={loading} />
									</FormControl>
									<FormDescription>{t('emailDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('passwordLabel')}</FormLabel>
									<FormControl>
										<Input {...field} placeholder='*********' type='password' disabled={loading} />
									</FormControl>
									<FormDescription>{t('passwordDescription')}</FormDescription>
								</FormItem>
							)}
						/>
						<Button
							className='mt-2 w-full'
							type='submit'
							disabled={!isValid || loading}
							onClick={() => form.handleSubmit(onSubmit)}
						>
							{t('submitButton')}
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	)
}
