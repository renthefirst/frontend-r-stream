import { useState, useEffect } from 'react'

export function useMediaQuery(query: string) {
	const [value, setValue] = useState(false)

	useEffect(() => {
		function onChange(e: MediaQueryListEvent) {
			setValue(e.matches)
		}

		const media = matchMedia(query)
		media.addEventListener('change', onChange)

		setValue(media.matches)

		return () => media.removeEventListener('change', onChange)
	}, [value, query])

	return value
}
