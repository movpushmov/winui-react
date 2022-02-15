import React from 'react'
import { getMonths } from '../../../../../utils/date'

import styles from '../content.module.css'
import { DateButton } from '../DateButton'
import { CalendarDateValidator } from '../../../CalendarView'

interface YearProps {
	now: {
		year: number
		month: number
	}
	currentYear: number

	setCurrentPeriod: (period: Date) => void
	locale: string

	validator?: CalendarDateValidator
}

const firstDay = 1

export const Year = (props: YearProps): React.ReactElement => {
	const months = getMonths()

	return (
		<div className={styles['dates']}>
			{months.map(month => {
				const isBlocked = Boolean(props.validator) && !props.validator?.({ type: 'month', value: month })

				return (
					<DateButton
						content={month.toLocaleString(props.locale, { month: 'short' })}
						isCurrentData={
							props.currentYear === props.now.year &&
                            month.getMonth() === props.now.month &&
                            month.getFullYear() === props.now.year
						}
						isOut={false}
						key={month.getMonth()}
						style={{
							width: 54,
							height: 54,
							margin: '18px 9px',
						}}

						onClick={() => {
							if (!isBlocked) {
								props.setCurrentPeriod(new Date(props.currentYear, month.getMonth(), firstDay))
							}
						}}

						isBlocked={isBlocked}
					/>
				)
			})}
		</div>
	)
}
