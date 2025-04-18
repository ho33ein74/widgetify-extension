import { useQuery } from '@tanstack/react-query'
import { getMainClient } from '../../api'
import type { FetchedCity } from './weather.interface'

async function fetchRelatedCities(city: string): Promise<FetchedCity[]> {
	if (city.length > 1) {
		const client = await getMainClient()

		const response = await client.get<any>(`/weather/cities?city=${city}`)
		// returns city name in Persian if it's located in Iran
		return response.data
	}

	return []
}

export function useGetRelatedCities(city: string) {
	return useQuery({
		queryKey: ['getRelatedCities', city],
		queryFn: () => fetchRelatedCities(city),
		enabled: city.length > 0,
	})
}
