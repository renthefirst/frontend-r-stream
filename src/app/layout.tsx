import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { ColorSwitcher } from '@/components/ui/elements/ColorSwitcher'

import { ApolloClientProvider } from '@/providers/apollo-driver.provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast.provider'

import '../styles/globals.css'
import '../styles/themes.css'

export const metadata: Metadata = {
	title: 'R-Stream',
	description: 'R streaming platform'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()
	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={GeistSans.variable}>
				<ColorSwitcher />
				<ApolloClientProvider>
					<NextIntlClientProvider messages={messages}>
						<ThemeProvider
							attribute='class'
							defaultTheme='dark'
							disableTransitionOnChange
						>
							<ToastProvider />
							{children}
						</ThemeProvider>
					</NextIntlClientProvider>
				</ApolloClientProvider>
			</body>
		</html>
	)
}
