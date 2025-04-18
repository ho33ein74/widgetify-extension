import { getFromStorage, removeFromStorage, setToStorage } from '@/common/storage'
import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { getMainClient } from '../../api'

interface FetchedProfile {
	email: string
	avatar: string
	name: string
	connections: string[]
}

export interface UserProfile extends FetchedProfile {
	inCache?: boolean
}

export async function fetchUserProfile(): Promise<UserProfile> {
	const client = await getMainClient()
	try {
		const response = await client.get<UserProfile>('/users/@me')
		await setToStorage('profile', { ...response.data, inCache: true })
		return response.data
	} catch (error: any) {
		// if server error or network error, return cache data
		const isServerErrorOrNetworkError =
			error.response?.status >= 500 || error.code === 'ERR_NETWORK'
		if (isServerErrorOrNetworkError) {
			const cachedProfile = await getFromStorage('profile')
			if (cachedProfile) {
				return cachedProfile
			}
		}

		if (error.response?.status === 401) {
			await removeFromStorage('auth_token')
			await removeFromStorage('profile')
		}

		throw error
	}
}

export function useGetUserProfile(options?: Partial<UseQueryOptions<UserProfile>>) {
	return useQuery({
		queryKey: ['userProfile'],
		queryFn: fetchUserProfile,
		staleTime: 5 * 60 * 1000, // 5 minutes
		retry: 1,
		refetchOnWindowFocus: false,
		...options,
	})
}
