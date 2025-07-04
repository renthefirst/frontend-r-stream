import { redirect } from 'next/navigation'

import { CreateAccountForm } from '@/components/features/auth/forms/CreateAccountForm'
import VerifyAccountForm from '@/components/features/auth/forms/VerifyAccountForm'

export default async function VerifyAccountPage(props: { searchParams: Promise<{ token: string }> }) {
	const { token } = await props.searchParams

	if (!token) {
		return redirect('/account/login')
	}

	return <VerifyAccountForm />
}
