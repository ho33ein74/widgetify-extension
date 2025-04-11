export interface Wallpaper {
	id: string
	name: string
	type: 'IMAGE' | 'VIDEO' | 'GRADIENT'
	src: string
	isCustom?: boolean
	source?: string
	gradient?: GradientColors
}

export interface GradientColors {
	from: string
	to: string
	direction: 'to-r' | 'to-l' | 'to-t' | 'to-b' | 'to-tr' | 'to-tl' | 'to-br' | 'to-bl'
}

export interface StoredWallpaper {
	id: string
	type: 'IMAGE' | 'VIDEO' | 'GRADIENT'
	src: string
	isRetouchEnabled: boolean
	gradient?: GradientColors
}

export interface WallpaperResponse {
	wallpapers: Wallpaper[]
}

// New Category interface
export interface Category {
	id: string
	name: string
	slug: string
	createdAt: string
	updatedAt: string
}
