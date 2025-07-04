'use client'

import { usePathname } from 'next/navigation'

import { useSidebar } from '@/hooks/useSidebar'

import { cn } from '@/utils/tw-merge'

import DashboardNav from './DashboardNav'
import SidebarHeader from './SidebarHeader'
import UserNav from './UserNav'

export default function Sidebar() {
	const { isCollapsed } = useSidebar()

	const pathname = usePathname()

	const isDashboardRoute = pathname.includes('/dashboard')

	return (
		<aside
			className={cn(
				'fixed left-0 z-50 mt-[75px] flex h-full flex-col border-r border-border bg-card transition-all duration-300 ease-in-out',
				isCollapsed ? 'w-16' : 'w-64'
			)}
		>
			<SidebarHeader />
			{isDashboardRoute ? <DashboardNav /> : <UserNav />}
		</aside>
	)
}
