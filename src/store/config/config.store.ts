import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { TypeBaseColor } from '@/libs/constants/colors.constants'

import { ConfigStore } from './config.types'

export const configStore = create(
	persist<ConfigStore>(
		set => ({
			theme: 'turquoise',
			setTheme: (value: TypeBaseColor) => set({ theme: value })
		}),
		{
			name: 'config',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
