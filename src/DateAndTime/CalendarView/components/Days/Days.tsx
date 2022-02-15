/* eslint-disable @typescript-eslint/no-magic-numbers */

import React, { useEffect, useState } from 'react'

import styles from './days.module.css'
import { TextBlock } from '../../../../Text/Text/TextBlock'

const daysInWeek = 7


function getDaysOfWeek(locale: string): string[] {
	const daysOfWeek: string[] = []

	// first sunday date
	const date = new Date(1970, 0, 4)

	for (let i = 0; i < daysInWeek; i++) {
		daysOfWeek.push(date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 2))
		date.setDate(date.getDate() + 1)
	}

	return daysOfWeek
}

interface DaysProps {
	locale: string
}

export const Days = React.memo(({ locale } : DaysProps) =>
	<div className={styles['days-names']}>
		{getDaysOfWeek(locale).map(day =>
			<TextBlock key={day}>
				{day}
			</TextBlock>,
		)}
	</div>,
)
