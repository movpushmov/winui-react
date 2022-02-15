export interface ItemPosition {
	row: number
	column: number
}

const daysInWeek = 7

export function toPosition(index: number): ItemPosition {
	return {
		row: Math.floor(index / daysInWeek),
		column: index - Math.floor(index / daysInWeek) * daysInWeek,
	}
}

export function toIndex(position: ItemPosition): number {
	return position.row * daysInWeek + position.column
}
