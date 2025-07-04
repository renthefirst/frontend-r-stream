'use client'

import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

import { Button } from '@/components/ui/common/Button'
import { Input } from '@/components/ui/common/Input'

export  function Search() {
	const t = useTranslations('layout.header.search')
	const [searchTerm, setSearchTerm] = useState('')
	const router = useRouter()

	function handleSearch(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		if (searchTerm.trim().length > 0) {
			router.push(`/streams?q=${searchTerm}`)
		} else {
			router.push('/streams')
		}
	}

	return (
		<div className='ml-auto hidden lg:block'>
			<form className='relative flex items-center' onSubmit={handleSearch}>
				<Input
					className='w-full rounded-full   pl-4 pr-10 lg:w-[400px]'
					placeholder={t('placeholder')}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<Button type='submit' className='absolute right-0.5 h-9'>
					<SearchIcon className='absolute size-[18px]' />
				</Button>
			</form>
		</div>
	)
}
