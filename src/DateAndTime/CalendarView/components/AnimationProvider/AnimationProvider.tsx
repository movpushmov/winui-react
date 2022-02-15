import React, { useCallback, useEffect, useState } from 'react'
import { CalendarZoom } from '../../CalendarView'
import { usePrevious } from '../../../../utils/usePrevious'

import styles from './styles.module.css'

interface AnimationProviderProps {
	zoom: CalendarZoom
	type: CalendarZoom

	children: React.ReactNode
}

export const AnimationProvider = (props: AnimationProviderProps): React.ReactElement => {
	const [className, setClassName] = useState(
		props.zoom === props.type ? styles['visible'] : styles['hidden'],
	)
	const previous = usePrevious(props.zoom)

	const monthHandler = useCallback(() => {
		if (props.zoom === props.type) {
			setClassName(styles['zoom-in-visible'])
		} else {
			setClassName(styles['zoom-in-hidden'])
		}
	}, [props.zoom, props.type])

	const yearHandler = useCallback(() => {
		if (props.zoom === props.type && previous === CalendarZoom.DECADE) {
			setClassName(styles['zoom-in-visible'])
		} else if (props.zoom === props.type && previous === CalendarZoom.MONTH) {
			setClassName(styles['zoom-out-visible'])
		} else if (props.zoom !== props.type && props.zoom === CalendarZoom.MONTH) {
			setClassName(styles['zoom-out-hidden'])
		} else if (props.zoom !== props.type && props.zoom === CalendarZoom.DECADE) {
			setClassName(styles['zoom-in-hidden'])
		}
	}, [props.zoom, props.type, previous])

	// eslint-disable-next-line sonarjs/no-identical-functions
	const decadeHandler = useCallback(() => {
		if (props.zoom === props.type) {
			setClassName(styles['zoom-out-visible'])
		} else {
			setClassName(styles['zoom-out-hidden'])
		}
	}, [props.zoom, props.type])

	useEffect(() => {
		if (previous !== void 0 && props.zoom !== previous) {
			switch (props.type) {
				case CalendarZoom.MONTH: {
					if (previous === CalendarZoom.DECADE) {
						break
					}

					monthHandler()
					break
				}

				case CalendarZoom.YEAR: {
					yearHandler()
					break
				}

				case CalendarZoom.DECADE: {
					if (previous === CalendarZoom.MONTH) {
						break
					}

					decadeHandler()
					break
				}
			}
		}
	}, [props.zoom, decadeHandler, monthHandler, previous, props.type, yearHandler])

	return (
		<div className={`${styles['content-block']} ${className}`}>
			{props.children}
		</div>
	)
}

