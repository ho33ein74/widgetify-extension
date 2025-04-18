import { motion } from 'framer-motion'
import moment from 'jalali-moment'

interface NewsItemProps {
	title: string
	description?: string
	source: {
		name: string
		url: string
	}
	publishedAt: string
	link?: string
	index: number
	onClick: (url: string) => void
}

export const NewsItem = ({
	title,
	description,
	source,
	publishedAt,
	link,
	index,
	onClick,
}: NewsItemProps) => {
	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString)
			return moment(date).locale('fa').format('HH:mm - jYYYY/jMM/jDD')
		} catch (e) {
			return dateString
		}
	}

	const handleClick = () => {
		const url = link || source.url
		if (url && typeof url === 'string') onClick(url)
	}

	return (
		<motion.div
			key={index}
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3, delay: index * 0.1 }}
		>
			<div
				className="p-2 rounded-lg cursor-pointer hover:bg-opacity-50 hover:bg-gray-500/10"
				onClick={handleClick}
			>
				<div className="flex items-start justify-between">
					<h3 className="text-sm font-medium">{title}</h3>
					<span className="px-2 py-1 mr-1 text-xs rounded-full whitespace-nowrap bg-primary/10 text-primary">
						{source.name}
					</span>
				</div>
				{description && (
					<p className="mt-1 text-xs font-light line-clamp-2 opacity-80">
						{description.replace(/\n/g, ' ').replace(/<.*?>/g, '')}
					</p>
				)}
				<div className="flex items-center justify-between mt-1 text-xs opacity-60">
					<span></span>
					<span dir="ltr">{formatDate(publishedAt)}</span>
				</div>
			</div>
		</motion.div>
	)
}
