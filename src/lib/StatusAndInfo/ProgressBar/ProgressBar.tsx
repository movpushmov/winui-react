import React from 'react'
import styles from './styles.module.css'
import { ProgressProps } from '../types'
import { useProgressBarLogic } from './useProgressBarLogic'

export interface ProgressBarProps extends ProgressProps {
	state?: 'running' | 'paused' | 'error'
}

export const ProgressBar = (props: ProgressBarProps): React.ReactElement | null => {
	const progressBarLogic = useProgressBarLogic(props)

	if (props.determinate) {
		return (
			<div
				className={`${styles['loader']} ${props.className || ''}`}
				style={props.style}
			>
				<div
					className={styles['determinate-indicator']}
					style={{ width: `${progressBarLogic.percentage}%` }}
				/>
				<div className={styles['determinate-background']}/>
			</div>
		)
	}

	if (!props.active) {
		return null
	}

	return (
		<div
			className={`${styles['loader']} ${props.className || ''}`}
			style={props.style}
		>
			<div
				className={styles['indicator']}
				data-state={progressBarLogic.state}
			/>
		</div>
	)
}
