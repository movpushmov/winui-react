import React from 'react'
import styles from './content.module.css'
import { Button } from '../../../../BasicInput/Button/Button'

interface DateButtonProps {
	content: string | number

	isCurrentData: boolean
	isOut: boolean
	isBlocked: boolean

	style?: React.CSSProperties
	onClick?: () => void
}

export const DateButton = (props: DateButtonProps): React.ReactElement => {
	let className = props.isCurrentData ? styles['current-date'] : styles['date']

	if (props.isOut && !props.isCurrentData) {
		className = styles['out-date']
	}

	if (props.isBlocked) {
		className += ` ${styles['blocked-date']}`
	}

	return (
		<Button
			className={className}
			type={props.isCurrentData ? 'accent' : 'default'}
			style={props.style}
			onClick={props.onClick}
		>
			{props.content}
		</Button>
	)
}
