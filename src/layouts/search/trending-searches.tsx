import { getFromStorage, setToStorage } from '@/common/storage'
import { OfflineIndicator } from '@/components/offline-indicator'
import { useTheme } from '@/context/theme.context'
import { type TrendItem, useGetTrends } from '@/services/getMethodHooks/trends/getTrends'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaChartLine } from 'react-icons/fa'

interface TrendingSearchesProps {
	visible: boolean
	onSelectTrend: (trend: string) => void
}

export const TrendingSearches = ({ visible, onSelectTrend }: TrendingSearchesProps) => {
	const { theme, themeUtils } = useTheme()

	const [trends, setTrends] = useState<TrendItem[]>([])
	const [isCached, setIsCached] = useState(false)

	const { data, isError } = useGetTrends({
		enabled: visible,
	})

	useEffect(() => {
		if (data?.length) {
			setTrends(data)
			setIsCached(false)
			setToStorage('search_trends', data)
		}

		if (isError) {
			const fetchTrendsFromStorage = async () => {
				const storedData = await getFromStorage('search_trends')
				if (storedData?.length) {
					setTrends(storedData)
					setIsCached(true)
				}
			}

			fetchTrendsFromStorage()
		}
	}, [data, isError])

	const getTrendItemBackground = () => {
		switch (theme) {
			case 'light':
				return 'bg-gray-100 hover:bg-gray-200'
			case 'dark':
				return 'bg-neutral-800 hover:bg-neutral-700/90'
			default:
				return 'bg-neutral-900/70 backdrop-blur-sm hover:bg-neutral-800/80'
		}
	}

	const getFooterBackground = () => {
		switch (theme) {
			case 'light':
				return 'bg-gray-50'
			case 'dark':
				return 'bg-neutral-900'
			default:
				return 'bg-neutral-900/50'
		}
	}

	if (!visible || !trends.length) return null

	const brandStyle = theme === 'light' ? 'text-indigo-600' : 'text-indigo-400'

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: -10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				className={`absolute left-0 right-0 z-20 w-full mt-1 border shadow-lg rounded-xl overflow-hidden ${themeUtils.getCardBackground()} ${themeUtils.getBorderColor()}`}
			>
				<div className="p-3">
					<div className="flex flex-col mb-3">
						<div className="flex items-center justify-between">
							<h2 className={`text-sm font-medium ${themeUtils.getHeadingTextStyle()}`}>
								ترندهای امروز
							</h2>
							<FaChartLine className="w-4 h-4 opacity-50" />
						</div>

						{isCached && (
							<OfflineIndicator
								mode="status"
								message="به دلیل مشکل در اتصال، اطلاعات ذخیره شده قبلی نمایش داده می‌شود"
							/>
						)}
					</div>

					<div className="grid gap-2 md:grid-cols-2">
						{trends.slice(0, 6).map((trend, index) => (
							<motion.div
								key={trend.title}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: index * 0.05 }}
								className={`flex items-center p-2 cursor-pointer transition-colors rounded-lg ${getTrendItemBackground()}`}
								onClick={() => onSelectTrend(trend.title)}
							>
								<span className={'text-xs mr-2'}>{index + 1}.</span>
								<p className="text-sm font-light">{trend.title}</p>
							</motion.div>
						))}
					</div>
				</div>

				{/* Footer with message */}
				<div
					className={`mt-3 py-2 px-3 text-center text-xs border-t ${getFooterBackground()} ${themeUtils.getBorderColor()}`}
				>
					<span className={`font-semibold ${brandStyle}`}>ویجتی‌فای</span>
					<span className={'font-light opacity-60'}>
						{' '}
						| این فیچر به پیشنهاد شما ایجاد شده است.
					</span>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
