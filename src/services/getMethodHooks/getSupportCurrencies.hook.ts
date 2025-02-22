import { useQuery } from '@tanstack/react-query'
import { type ApiResponse, getMainClient } from '../api'

export type SupportedCurrencies = {
	key: string
	type: 'coin' | 'crypto' | 'currency'
	country?: string
	label: {
		fa: string
		en: string
	}
	changePercentage: number
}[]

export const useGetSupportCurrencies = () => {
	return useQuery<SupportedCurrencies>({
		queryKey: ['supportedCurrencies'],
		queryFn: async () => getSupportCurrencies(),
		retry: 0,
	})
}

async function getSupportCurrencies(): Promise<SupportedCurrencies> {
	const client = await getMainClient()
	const { data } = await client.get<ApiResponse<SupportedCurrencies>>(
		'/currencies/supported-list',
	)
	return data.data
}
