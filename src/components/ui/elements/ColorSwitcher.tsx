'use client'

import { useEffect } from 'react'

import { useConfig } from '@/hooks/useConfig'

export function ColorSwitcher() {
	const { theme } = useConfig()

	useEffect(() => {
		document.body.classList.forEach(className => {
			if (className.match(/theme-\w+/)) {
				document.body.classList.remove(className)
			}
		})

		if (theme) {
			document.body.classList.add(`theme-${theme}`)
		}
        
	}, [theme])

	return null
}
