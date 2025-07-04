import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { ChangeChatSettings } from '@/components/features/chat/settings/ChangeChatSettings'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('dashboard.chat.header')
	return {
		title: t('heading'),
		description: t('description'),
		robots: {
			index: false,
			follow: false
		}
	}
}

export default function ChatSettingsPage() {
	return <ChangeChatSettings />
}
