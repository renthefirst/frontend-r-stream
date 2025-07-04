import { z } from 'zod'

export const changeChatSettingsSchema = z.object({
	isChatEnabled: z.boolean(),
	isChatForFollowersOnly: z.boolean(),
	isChatForPremiumFollowersOnly: z.boolean()
})

export type TypeChangeChatSettingsSchema = z.infer<typeof changeChatSettingsSchema>
