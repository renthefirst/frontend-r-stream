'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/common/InputOTP'

import {
	useEnableTotpMutation,
	useGenerateTotpSecretQuery
} from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	type TypeEnableTotpSchema,
	enableTotpSchema
} from '@/schemas/user/enable-totp.schema'

export function EnableTOTP() {
	const t = useTranslations('dashboard.settings.account.twoFactor.enable')
	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useCurrent()
	const { data, loading: isLoadingGenerating } = useGenerateTotpSecretQuery()

	const twoFactorAuth = data?.generateTotpSecret

	const form = useForm<TypeEnableTotpSchema>({
		resolver: zodResolver(enableTotpSchema),
		defaultValues: {
			pin: ''
		}
	})

	const { isValid } = form.formState

	const [enableTotp, { loading: isLoadingEnablingTOTP }] = useEnableTotpMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError(error) {
			toast.error(t('errorMessage'))
			form.reset()
		}
	})

	function onSubmit(data: TypeEnableTotpSchema) {
		enableTotp({
			variables: {
				data: {
					pin: data.pin,
					secret: twoFactorAuth?.secret ?? ''
				}
			}
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>{t('trigger')}</Button>
			</DialogTrigger>{' '}
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<div className='flex flex-col items-center justify-center gap-4'>
							<span className='text-sm text-muted-foreground'>
								{twoFactorAuth?.qrcodeUrl ? t('qrInstructions') : ''}
							</span>

							<img
								src={twoFactorAuth?.qrcodeUrl}
								alt='QR Code'
								className='rounded-lg'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<div className='flex flex-col gap-2'>
								<span className='text-center text-sm text-muted-foreground'>
									{twoFactorAuth?.secret
										? t('secretCodeLabel') + twoFactorAuth.secret
										: ''}
								</span>
							</div>
							<FormField
								control={form.control}
								name='pin'
								render={({ field }) => (
									<FormItem className='flex flex-col justify-center max-sm:items-center'>
										<FormLabel>{t('pinLabel')}</FormLabel>
										<FormControl>
											<InputOTP
												maxLength={6}
												{...field}
												disabled={isLoadingEnablingTOTP}
											>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											{t('pinDescription')}
										</FormDescription>
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<Button
								type='submit'
								disabled={
									!isValid ||
									isLoadingGenerating ||
									isLoadingEnablingTOTP
								}
							>
								{t('submitButton')}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
