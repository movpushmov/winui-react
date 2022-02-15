import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'

import { Header } from './components/Header/Header'
import { Month } from './components/Content/components/Month'
import { AnimationProvider } from './components/AnimationProvider/AnimationProvider'
import { getDecade } from '../../utils/date'
import { Year } from './components/Content/components/Year'
import { Decade } from './components/Content/components/Decade'

type Value =
	{ type: 'day'; value: Date } |
	{ type: 'month'; value: Date } |
	{ type: 'year'; value: number }

export type CalendarDateValidator = (value: Value) => boolean

interface CalendarViewProps {
	locale?: string
	identifier?: string
	selectionMode?: 'single' | 'multiply' | 'none'

	isGroupLabelVisible?: boolean
	isOutOfScopeEnabled?: boolean

	validator?: CalendarDateValidator
	selectedDates?: Date[]

	onSelect?: (date: Date) => void
}

export enum CalendarZoom {
	MONTH,
	YEAR,
	DECADE
}

const offset = 1

export const CalendarView = (props: CalendarViewProps): React.ReactElement => {
	const defaultProps = Object.assign({
		locale: 'en-US',
		identifier: 'gregorian',
		selectionMode: 'single',

		isGroupLabelVisible: true,
		isOutOfScopeEnabled: true,
	}, props)

	const currentDay = useRef(new Date())

	const [selectedDates, setSelectedDays] = useState(props.selectedDates ?? [])
	const [currentPeriod, setCurrentPeriod] = useState(new Date())
	const [currentYear, setCurrentYear] = useState(currentPeriod.getFullYear())
	const [currentDecade, setCurrentDecade] = useState(getDecade(currentPeriod.getFullYear()))

	useEffect(() => {
		setCurrentYear(currentPeriod.getFullYear())
		setCurrentDecade(getDecade(currentPeriod.getFullYear()))
	}, [currentPeriod])

	const selectDate = useCallback((date: Date) => {
		switch (defaultProps.selectionMode) {
			case 'single': {
				if (!props.selectedDates) {
					setSelectedDays([date])
				}

				props.onSelect?.(date)
				break
			}
			case 'multiply': {
				if (!props.selectedDates) {
					setSelectedDays(selectedDates.concat(date))
				}

				props.onSelect?.(date)

				break
			}
			case 'none': {
				break
			}
		}
	}, [defaultProps.selectionMode, props, selectedDates])

	const [zoom, setZoom] = useState(CalendarZoom.MONTH)

	return (
		<div className={styles['container']}>
			<Header
				currentPeriod={currentPeriod}
				zoom={zoom}
				currentYear={currentYear}
				currentDecade={currentDecade}

				locale={defaultProps.locale}
				actions={{
					next: () => {
						switch (zoom) {
							case CalendarZoom.MONTH: {
								setCurrentPeriod(() => {
									const newDate = new Date(currentPeriod)

									newDate.setDate(offset)
									newDate.setMonth(newDate.getMonth() + offset)

									return newDate
								})

								break
							}
							case CalendarZoom.YEAR: {
								setCurrentYear(y => y + offset)

								break
							}
							case CalendarZoom.DECADE: {
								setCurrentDecade(d => getDecade(d.end + offset))

								break
							}
						}
					},

					prev: () => {
						switch (zoom) {
							case CalendarZoom.MONTH: {
								setCurrentPeriod(() => {
									const newDate = new Date(currentPeriod)

									newDate.setDate(offset)
									newDate.setMonth(newDate.getMonth() - offset)

									return newDate
								})

								break
							}
							case CalendarZoom.YEAR: {
								setCurrentYear(y => y - offset)

								break
							}
							case CalendarZoom.DECADE: {
								setCurrentDecade(d => getDecade(d.start - offset))

								break
							}
						}
					},

					changeZoom: () => {
						switch (zoom) {
							case CalendarZoom.MONTH: {
								setZoom(CalendarZoom.YEAR)
								break
							}
							case CalendarZoom.YEAR: {
								setZoom(CalendarZoom.DECADE)
								break
							}
							case CalendarZoom.DECADE: {
								break
							}
						}
					},
				}}
			/>

			<div className={styles['content']}>
				<AnimationProvider zoom={zoom} type={CalendarZoom.MONTH}>
					<Month
						validator={props.validator}
						locale={defaultProps.locale}
						currentPeriod={currentPeriod}
						currentDay={{
							date: currentDay.current.getDate(),
							month: currentDay.current.getMonth(),
							year: currentDay.current.getFullYear(),
						}}

						selectedDates={selectedDates}
						selectDate={selectDate}
					/>
				</AnimationProvider>

				<AnimationProvider zoom={zoom} type={CalendarZoom.YEAR}>
					<Year
						now={{
							month: currentDay.current.getMonth(),
							year: currentDay.current.getFullYear(),
						}}

						currentYear={currentYear}
						setCurrentPeriod={period => {
							setZoom(CalendarZoom.MONTH)
							setCurrentPeriod(period)
						}}
						locale={defaultProps.locale}
						validator={props.validator}
					/>
				</AnimationProvider>

				<AnimationProvider zoom={zoom} type={CalendarZoom.DECADE}>
					<Decade
						currentYear={currentDay.current.getFullYear()}
						currentDecade={currentDecade}
						setCurrentYear={year => {
							setCurrentYear(year)
							setZoom(CalendarZoom.YEAR)
						}}
						locale={defaultProps.locale}
						validator={props.validator}
					/>
				</AnimationProvider>
			</div>
		</div>
	)
}
