import React from 'react'

interface ICalendarViewProps {
	identifier?: 'gregorian'
	selectionMode?: 'single' | 'none' | 'multiply'

	isGroupLabelVisible?: boolean
	isOutOfScopeEnabled?: boolean

	language?: string
}

export const CalendarView = (props: ICalendarViewProps) => {
	const defaultProps = {

	}

	return (
		<div>

		</div>
	)
}
