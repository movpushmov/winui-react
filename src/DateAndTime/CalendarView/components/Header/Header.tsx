import React from 'react'

import { Button } from '../../../../BasicInput/Button/Button'

import styles from './header.module.css'
import { Icon, IconType } from '../../../../Icons/Icon'
import { Decade } from '../../../../utils/date'
import { Title } from './Title'
import { CalendarZoom } from '../../CalendarView'

interface HeaderProps {
	zoom: CalendarZoom
	currentPeriod: Date
	currentYear: number
	currentDecade: Decade

	locale: string

	actions: {
		next: () => void
		prev: () => void
		changeZoom: () => void
	}
}

export const Header = (props: HeaderProps): React.ReactElement =>
	<div className={styles['controls']}>
		<Button className={styles['timelapse-button']} onClick={props.actions.changeZoom}>
			<Title
				zoom={props.zoom}
				locale={props.locale}
				currentPeriod={props.currentPeriod}
				currentYear={props.currentYear}
				currentDecade={props.currentDecade}
			/>
		</Button>

		<Button className={styles['scroll-button']} onClick={props.actions.prev}>
			<Icon type={IconType.CaretUpSolid8} style={{ color: 'var(--fill-color-control-strong-default)' }}/>
		</Button>
		<Button className={styles['scroll-button']} onClick={props.actions.next}>
			<Icon type={IconType.CaretDownSolid8} style={{ color: 'var(--fill-color-control-strong-default)' }}/>
		</Button>
	</div>

