import keepItImage from '@/assets/keep-it.png'
import { useTheme } from '@/context/theme.context'
import { motion } from 'framer-motion'
import { useState } from 'react'
import Modal from './modal'

interface ExtensionInstalledModalProps {
	show: boolean
	onClose: () => void
	onGetStarted: () => void
}

export function ExtensionInstalledModal({
	show,
	onGetStarted,
}: ExtensionInstalledModalProps) {
	const { themeUtils } = useTheme()
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = 3

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<>
						<motion.div
							className="mb-6"
							initial={{ y: -20 }}
							animate={{ y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<h3
								className={`mb-3 text-2xl font-bold ${themeUtils.getHeadingTextStyle()}`}
							>
								به ویجتی‌فای خوش آمدید! 🎉
							</h3>
							<p className={`leading-relaxed ${themeUtils.getDescriptionTextStyle()}`}>
								برای استفاده از تمام امکانات ویجتی‌فای، لازم است که افزونه در مرورگر شما
								فعال بماند.
							</p>
						</motion.div>

						<motion.div
							className={`relative p-3 mt-2 mb-6 border rounded-xl ${themeUtils.getBorderColor()}  ${themeUtils.getCardBackground()}`}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<div className="flex items-center justify-center">
								<img
									src={keepItImage}
									alt="نحوه فعالسازی افزونه"
									className="h-auto max-w-full rounded-lg shadow-xl"
									style={{ maxHeight: '220px' }}
								/>
							</div>
						</motion.div>

						<motion.div
							className={`p-3 mb-6 text-gray-200 rounded-lg border ${themeUtils.getBorderColor()}  ${themeUtils.getCardBackground()}`}
							initial={{ x: -20, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.6 }}
						>
							<p className="font-bold">
								⚠️ برای فعالسازی افزونه، روی دکمه "Keep It" کلیک کنید.
							</p>
						</motion.div>

						<button
							onClick={() => setCurrentStep(2)}
							className="px-8 py-3 font-light text-white transition-all cursor-pointer duration-300 transform bg-blue-600 bg-opacity-80 border border-blue-400/30 rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:bg-opacity-90 hover:shadow-xl backdrop-blur-sm"
						>
							Keep It رو زدم!
						</button>
					</>
				)

			case 2:
				return (
					<>
						<motion.div
							className="mb-6"
							initial={{ y: -20 }}
							animate={{ y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<h3
								className={`mb-3 text-2xl font-bold ${themeUtils.getHeadingTextStyle()}`}
							>
								درباره ما{' '}
							</h3>
							<p className={`leading-relaxed ${themeUtils.getDescriptionTextStyle()}`}>
								ما متن باز هستیم! ویجتی‌فای یک پروژه متن‌باز است که با عشق توسعه داده می‌شود.
							</p>
						</motion.div>

						<motion.div
							className={`p-3 mb-6 text-gray-200 rounded-lg border ${themeUtils.getBorderColor()}  ${themeUtils.getCardBackground()}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<p className="font-medium">
								🔒 ما به حریم خصوصی شما احترام می‌گذاریم و داده‌های شما را جمع‌آوری نمی‌کنیم.
							</p>
						</motion.div>

						<button
							onClick={() => setCurrentStep(3)}
							className="px-8 py-3 font-light text-white cursor-pointer transition-all duration-300 transform bg-blue-600 bg-opacity-80 border border-blue-400/30 rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:bg-opacity-90 hover:shadow-xl backdrop-blur-sm"
						>
							ادامه
						</button>
					</>
				)

			case 3:
				return (
					<>
						<motion.div
							className="mb-6"
							initial={{ y: -20 }}
							animate={{ y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<h3
								className={`mb-3 text-2xl font-bold ${themeUtils.getHeadingTextStyle()}`}
							>
								آماده شروع هستید؟
							</h3>
						</motion.div>

						<motion.div
							className={`p-3 mb-6 border rounded-lg ${themeUtils.getCardBackground()} backdrop-blur-sm ${themeUtils.getBorderColor()}`}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<p className={themeUtils.getTextColor()}>
								بریم که یک تجربه جدید و جذاب را شروع کنیم! 😎
							</p>
						</motion.div>

						<div className="flex flex-col w-full gap-4 mt-4 sm:flex-row">
							<button
								onClick={onGetStarted}
								className="px-6 py-3 font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-600/80 to-indigo-600/80 border border-blue-400/30 rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.2)] cursor-pointer hover:bg-opacity-90 hover:shadow-[0_12px_20px_rgba(0,0,0,0.25)] backdrop-blur-sm w-full sm:flex-1"
							>
								شروع کنید
							</button>

							{/* <button
								onClick={onClose}
								className={`px-6 py-3 font-medium transition-all duration-300 border rounded-lg shadow cursor-pointer w-full sm:w-auto ${themeUtils.getBorderColor()} ${themeUtils.getCardBackground()} hover:bg-opacity-80 hover:shadow-md backdrop-blur-sm`}
							>
								بستن
							</button> */}
						</div>
					</>
				)

			default:
				return null
		}
	}

	const StepIndicator = () => (
		// biome-ignore lint/a11y/useFocusableInteractive: <explanation>
		<div
			className="flex items-center justify-center gap-3 mt-6"
			role="progressbar"
			aria-valuenow={currentStep}
			aria-valuemin={1}
			aria-valuemax={totalSteps}
		>
			{Array.from({ length: totalSteps }).map((_, index) => (
				<button
					key={index}
					onClick={() => setCurrentStep(index + 1)}
					aria-label={`رفتن به گام ${index + 1}`}
					aria-current={index + 1 === currentStep ? 'step' : undefined}
					className={`w-10 h-2 rounded-full transition-all duration-300 ${
						index + 1 === currentStep
							? 'bg-blue-500 shadow-lg shadow-blue-500/30'
							: index + 1 < currentStep
								? 'bg-blue-600'
								: 'bg-gray-700 hover:bg-gray-600'
					}`}
				/>
			))}
		</div>
	)

	return (
		<Modal
			isOpen={show}
			onClose={() => {}}
			size="sm"
			direction="rtl"
			showCloseButton={false}
			closeOnBackdropClick={false}
		>
			<motion.div
				className={'flex flex-col items-center p-6 text-center'}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.4 }}
			>
				{renderStepContent()}
			</motion.div>

			<StepIndicator />
		</Modal>
	)
}
