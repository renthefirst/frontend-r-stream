import { Bell } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/common/Popover'

import { useFindUnreadNotificationCountQuery } from '@/graphql/generated/output'
import NotificationList from './NotificationList'

export function Notifications() {
	const { data, loading: isLoadingUnreadNotificationCount } = useFindUnreadNotificationCountQuery()
	const count = data?.findUnreadNotificationsCount ?? 0

	const displayCount = count > 10 ? '9+' : count

	return (
		<Popover>
			<PopoverTrigger>
				{count !== 0 && (
					<div className='absolute right-[75px] top-3 rounded-full bg-primary px-[4px] text-xs font-semibold text-white'>
						{displayCount}
					</div>
				)}
				<Bell className='size-6 text-foreground' />
			</PopoverTrigger>
			<PopoverContent align='end' className='max-h-[500px] w-[400px] overflow-y-auto'>
				<NotificationList />
			</PopoverContent>
		</Popover>
	)
}
