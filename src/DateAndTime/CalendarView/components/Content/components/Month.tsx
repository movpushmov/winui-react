import styles from '../content.module.css'
import React, { useEffect, useState } from 'react'

import { DateButton } from '../DateButton'
import { getDaysInMonth } from '../../../../../utils/date'
import { CalendarDateValidator } from '../../../CalendarView'
import { Days } from '../../Days/Days'

interface ContentProps {
	locale: string

	currentPeriod: Date
	currentDay: {
		date: number
		month: number
		year: number
	}

	selectedDates: Date[]
	selectDate: (date: Date) => void
	validator?: CalendarDateValidator
}

function generateIndex(date: Date): string {
	return `${date.getDate()}.${date.getMonth()}`
}

function toPlain(date: Date): { day: number; month: number; year: number } {
	return {
		day: date.getDate(),
		month: date.getMonth(),
		year: date.getFullYear(),
	}
}

function includes(dates: Date[], date: Date): boolean {
	const plainDate = toPlain(date)

	for (const selectedDates of dates) {
		const plainSelectedDay = toPlain(selectedDates)

		if (
			plainDate.day === plainSelectedDay.day &&
			plainDate.year === plainSelectedDay.year &&
			plainDate.month === plainSelectedDay.month
		) {
			return true
		}
	}

	return false
}

export const Month = ({ locale, currentPeriod, currentDay, selectDate, validator, selectedDates } : ContentProps): React.ReactElement => {
	const [days, setDays] = useState(getDaysInMonth(
		currentPeriod.getMonth(),
		currentPeriod.getFullYear(),
	))

	useEffect(() => {
		setDays(getDaysInMonth(
			currentPeriod.getMonth(),
			currentPeriod.getFullYear(),
		))
	}, [currentPeriod])

	return (
		<>
			<Days locale={locale}/>

			<div className={styles['dates']}>
				{days.map(day => {
					const isBlocked =
						Boolean(validator) &&
						!validator?.({ type: 'day', value: day }) ||
						!validator?.({ type: 'month', value: day }) ||
						!validator?.({ type: 'year', value: day.getFullYear() })

					return (
						<DateButton
							content={day.getDate()}
							isCurrentData={
								day.getDate() === currentDay.date &&
								day.getMonth() === currentDay.month &&
								day.getFullYear() === currentDay.year
							}
							isOut={day.getMonth() !== currentPeriod.getMonth() || day.getFullYear() !== currentPeriod.getFullYear()}
							key={generateIndex(day)}
							onClick={() => {
								if (!isBlocked) {
									selectDate(day)
								}
							}}

							style={includes(selectedDates, day) ? {
								border: '1px solid var(--accent-color)',
								color: 'var(--accent-text-color-primary)',
							} : void 0}

							isBlocked={isBlocked}
						/>
					)
				})}
			</div>
		</>
	)
}

