import { useTheme } from '@/context/theme.context'
import { motion } from 'framer-motion'
import type React from 'react'
import { useMemo } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { FiCalendar } from 'react-icons/fi'
import { type WidgetifyDate, getCurrentDate } from '../utils'

const PERSIAN_MONTHS = [
	'فروردین',
	'اردیبهشت',
	'خرداد',
	'تیر',
	'مرداد',
	'شهریور',
	'مهر',
	'آبان',
	'آذر',
	'دی',
	'بهمن',
	'اسفند',
]

interface CalendarHeaderProps {
	currentDate: WidgetifyDate
	selectedDate: WidgetifyDate
	setCurrentDate: (date: WidgetifyDate) => void
	goToToday: () => void
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
	currentDate,
	selectedDate,
	setCurrentDate,
	goToToday,
}) => {
	const { theme } = useTheme()

	const isCurrentMonthToday = useMemo(() => {
		const realToday = getCurrentDate()
		return (
			currentDate.jMonth() === realToday.jMonth() &&
			currentDate.jYear() === realToday.jYear()
		)
	}, [currentDate])

	const isTodaySelected = useMemo(() => {
		const realToday = getCurrentDate()
		return (
			selectedDate.jDate() === realToday.jDate() &&
			selectedDate.jMonth() === realToday.jMonth() &&
			selectedDate.jYear() === realToday.jYear()
		)
	}, [selectedDate])

	const showTodayButton = !isCurrentMonthToday || !isTodaySelected

	const changeMonth = (delta: number) => {
		// @ts-ignore
		setCurrentDate((prev: jalaliMoment.Moment) => prev.clone().add(delta, 'jMonth'))
	}

	const getHeaderTextStyle = () => {
		return theme === 'light' ? 'text-gray-700' : 'text-gray-200'
	}

	const getMonthNavigationStyle = () => {
		switch (theme) {
			case 'light':
				return 'text-gray-600 hover:bg-gray-100/80'
			case 'dark':
				return 'text-gray-300 hover:bg-neutral-800/50'
			default:
				return 'text-gray-300 hover:bg-white/10'
		}
	}

	return (
		<div className="flex items-center justify-between p-3 md:p-4">
			<h3 className={`font-medium text-md ${getHeaderTextStyle()}`}>
				{PERSIAN_MONTHS[currentDate.jMonth()]} {currentDate.jYear()}
			</h3>

			<div className="flex gap-1">
				{showTodayButton && (
					<motion.button
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						onClick={goToToday}
						className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-400 transition-colors rounded-lg cursor-pointer bg-blue-500/10 hover:bg-blue-500/20"
					>
						<FiCalendar size={14} />
						<span>امروز</span>
					</motion.button>
				)}

				<button
					onClick={() => changeMonth(-1)}
					className={`flex items-center gap-1 px-2 py-1 text-xs rounded-lg cursor-pointer transition-colors ${getMonthNavigationStyle()}`}
				>
					<FaChevronRight size={12} />
					<span>ماه قبل</span>
				</button>

				<button
					onClick={() => changeMonth(1)}
					className={`flex items-center gap-1 px-2 py-1  text-xs rounded-lg cursor-pointer transition-colors ${getMonthNavigationStyle()}`}
				>
					<span>ماه بعد</span>
					<FaChevronLeft size={12} />
				</button>
			</div>
		</div>
	)
}
