import { MEDIA_URL } from '@/libs/constants/url.constants'

export function getMediaSource(url: string | undefined | null) {
	return `${MEDIA_URL}/${url}`
}
