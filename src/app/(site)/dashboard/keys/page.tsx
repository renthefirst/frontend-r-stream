import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { KeysSettings } from '@/components/features/keys/settings/KeysSettings'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.keys.header')
	return {
		title: t('heading'),
		description: t('description'),
		robots: {
			index: false,
			follow: false
		}
	}
}

export default function KeysSettingsPage() {
	return <KeysSettings />
}
