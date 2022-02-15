import React from 'react'
import { CalendarZoom } from '../../CalendarView'
import { Decade } from '../../../../utils/date'
import { TextBlock } from '../../../../Text/Text/TextBlock'

interface TitleProps {
	zoom: CalendarZoom
	locale: string

	currentPeriod: Date
	currentYear: number
	currentDecade: Decade
}

export const Title = (props: TitleProps): React.ReactElement => {
	if (props.zoom === CalendarZoom.MONTH) {
		return (
			<TextBlock type="body-strong">
				{props.currentPeriod.toLocaleDateString(props.locale, { month: 'long' })}{' '}
				{props.currentPeriod.getFullYear()}
			</TextBlock>
		)
	}

	if (props.zoom === CalendarZoom.YEAR) {
		return (
			<TextBlock type="body-strong">
				{props.currentYear}
			</TextBlock>
		)
	}

	return (
		<TextBlock type="body-strong">
			{props.currentDecade.start}-{props.currentDecade.end}
		</TextBlock>
	)
}

