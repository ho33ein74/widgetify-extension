import type { GradientColors, Wallpaper } from '@/common/wallpaper.interface'
import { TextInput } from '@/components/text-input'
import { useTheme } from '@/context/theme.context'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GradientWallpaperProps {
	onSelectGradient: (gradient: Wallpaper) => void
	selectedGradient?: Wallpaper
}

const predefinedGradients: { from: string; to: string; name: string }[] = [
	{ from: '#ff9a9e', to: '#fad0c4', name: 'صورتی ملایم' },
	{ from: '#a1c4fd', to: '#c2e9fb', name: 'آبی آسمانی' },
	{ from: '#d4fc79', to: '#96e6a1', name: 'سبز بهاری' },
	{ from: '#ffecd2', to: '#fcb69f', name: 'نارنجی پاییزی' },
	{ from: '#84fab0', to: '#8fd3f4', name: 'فیروزه‌ای' },
	{ from: '#cfd9df', to: '#e2ebf0', name: 'خاکستری روشن' },
	{ from: '#a6c0fe', to: '#f68084', name: 'آبی به صورتی' },
	{ from: '#fbc2eb', to: '#a6c1ee', name: 'بنفش ملایم' },
]

const directions = [
	{ value: 'to-r', label: 'راست به چپ' },
	{ value: 'to-l', label: 'چپ به راست' },
	{ value: 'to-t', label: 'پایین به بالا' },
	{ value: 'to-b', label: 'بالا به پایین' },
	{ value: 'to-tr', label: 'مورب بالا-راست' },
	{ value: 'to-tl', label: 'مورب بالا-چپ' },
	{ value: 'to-br', label: 'مورب پایین-راست' },
	{ value: 'to-bl', label: 'مورب پایین-چپ' },
]

export function GradientWallpaper({
	onSelectGradient,
	selectedGradient,
}: GradientWallpaperProps) {
	const { themeUtils } = useTheme()
	const [customFromColor, setCustomFromColor] = useState('#7F00FF')
	const [customToColor, setCustomToColor] = useState('#E100FF')
	const [direction, setDirection] = useState<GradientColors['direction']>('to-r')

	useEffect(() => {
		if (selectedGradient?.type === 'GRADIENT' && selectedGradient.gradient?.direction) {
			setDirection(selectedGradient.gradient.direction)
		}
	}, [selectedGradient])

	useEffect(() => {
		console.log('Selected Gradient:', selectedGradient)
	}, [selectedGradient])

	const getTailwindDirectionToCss = (direction: string): string => {
		const directionMap: Record<string, string> = {
			'to-r': 'to right',
			'to-l': 'to left',
			'to-t': 'to top',
			'to-b': 'to bottom',
			'to-tr': 'to top right',
			'to-tl': 'to top left',
			'to-br': 'to bottom right',
			'to-bl': 'to bottom left',
		}
		return directionMap[direction] || 'to right'
	}

	const createGradientId = (from: string, to: string): string => {
		return `gradient-${from.replace('#', '')}-${to.replace('#', '')}`
	}

	const createGradientWallpaper = (from: string, to: string, name: string): Wallpaper => {
		return {
			id: createGradientId(from, to),
			name: name,
			type: 'GRADIENT',
			src: '',
			gradient: {
				from,
				to,
				direction,
			},
		}
	}

	const handleCustomGradientSelect = () => {
		const gradient = createGradientWallpaper(
			customFromColor,
			customToColor,
			'گرادیان سفارشی',
		)
		onSelectGradient(gradient)
	}

	const handlePredefinedGradientSelect = (from: string, to: string, name: string) => {
		const gradient = createGradientWallpaper(from, to, name)
		onSelectGradient(gradient)
	}

	const isSelected = (from: string, to: string) => {
		if (!selectedGradient) return false

		const gradientId = createGradientId(from, to)
		return selectedGradient.id === gradientId
	}

	return (
		<div className="space-y-4">
			<h3 className={`mb-2 text-lg font-medium ${themeUtils.getTextColor()}`}>
				گرادیان‌های پیش‌فرض
			</h3>
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{predefinedGradients.map((gradient, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.2, delay: index * 0.05 }}
						className={`rounded-lg h-24 cursor-pointer overflow-hidden relative
              ${isSelected(gradient.from, gradient.to) ? 'ring-2 ring-blue-500' : ''}
            `}
						onClick={() =>
							handlePredefinedGradientSelect(gradient.from, gradient.to, gradient.name)
						}
					>
						<div
							className={'absolute inset-0'}
							style={{
								backgroundImage: `linear-gradient(${getTailwindDirectionToCss(direction)}, ${gradient.from}, ${gradient.to})`,
							}}
						></div>
						<div className="absolute bottom-0 left-0 right-0 p-1 text-xs text-center text-white bg-black/30">
							{gradient.name}
						</div>
					</motion.div>
				))}
			</div>

			<div className="pt-4 border-t border-gray-200 dark:border-gray-700">
				<h3 className={`mb-3 text-lg font-medium ${themeUtils.getTextColor()}`}>
					گرادیان سفارشی
				</h3>

				<div className="flex flex-col gap-4 mb-4 sm:flex-row">
					<div className="flex-1 space-y-2">
						<label className={`block text-sm font-medium ${themeUtils.getTextColor()}`}>
							رنگ شروع
						</label>
						<div className="flex items-center gap-2">
							<TextInput
								key={'customFromColor'}
								type="color"
								value={customFromColor}
								onChange={(value) => setCustomFromColor(value)}
								className="!w-10 !h-10 cursor-pointer"
							/>
							<TextInput
								key={'customFromColorText'}
								type="text"
								value={customFromColor}
								onChange={(value) => setCustomFromColor(value)}
								className="flex-1 px-3 py-2rounded-md"
								placeholder="#000000"
							/>
						</div>
					</div>

					<div className="flex-1 space-y-2">
						<label className={`block text-sm font-medium ${themeUtils.getTextColor()}`}>
							رنگ پایان
						</label>
						<div className="flex items-center gap-2">
							<TextInput
								key={'customToColor'}
								type="color"
								value={customToColor}
								onChange={(value) => setCustomToColor(value)}
								className="!w-10 !h-10 cursor-pointer rounded"
							/>
							<TextInput
								key={'customToColorText'}
								type="text"
								value={customToColor}
								onChange={(value) => setCustomToColor(value)}
								placeholder="#000000"
							/>
						</div>
					</div>
				</div>

				<div className="mb-4">
					<label
						className={`block mb-2 text-sm font-medium ${themeUtils.getTextColor()}`}
					>
						جهت گرادیان
					</label>
					<select
						value={direction}
						onChange={(e) => setDirection(e.target.value as GradientColors['direction'])}
						className="w-full px-3 py-2 rounded-md"
					>
						{directions.map((dir) => (
							<option key={dir.value} value={dir.value}>
								{dir.label}
							</option>
						))}
					</select>
				</div>

				<div
					className="relative h-32 mb-4 overflow-hidden rounded-lg"
					style={{
						backgroundImage: `linear-gradient(${getTailwindDirectionToCss(direction)}, ${customFromColor}, ${customToColor})`,
					}}
				></div>

				<button
					onClick={handleCustomGradientSelect}
					className="w-full px-4 py-2 text-white transition-colors bg-blue-500 rounded-md cursor-pointer hover:bg-blue-600"
				>
					اعمال گرادیان
				</button>
			</div>
		</div>
	)
}
