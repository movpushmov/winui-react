import React from 'react'
import styles from './styles.module.css'
import { ProgressProps } from '../types'
import { useProgressRingLogic } from './useProgressRingLogic'

export interface ProgressRingProps extends ProgressProps {
	size?: 's' | 'm' | 'l'
}

const minXYCoefficient = 2
const minSizeAddition = 8
const percentageCoefficient = 0.01

export const ProgressRing = (props: ProgressRingProps): React.ReactElement | null => {
	const progressRingLogic = useProgressRingLogic(props)

	if (props.determinate) {
		return (
			<div
				className={props.className}
				style={Object.assign({
					width: progressRingLogic.size,
					height: progressRingLogic.size,
				}, props.style)}
			>
				<svg
					viewBox={`
						${progressRingLogic.size / minXYCoefficient}
						${progressRingLogic.size / minXYCoefficient}
						${progressRingLogic.size + minSizeAddition}
						${progressRingLogic.size + minSizeAddition}
					`}
					style={{ transform: 'rotate(-90deg)' }}
				>
					<circle
						ref={progressRingLogic.refLoaded}
						style={{
							strokeDasharray: length,
							strokeDashoffset: length - length * (
								progressRingLogic.percentage * percentageCoefficient
							),
							stroke: 'var(--accent-color)',
							strokeLinecap: 'round',
						}}
						cx={progressRingLogic.size + minSizeAddition / minXYCoefficient}
						cy={progressRingLogic.size + minSizeAddition / minXYCoefficient}
						r={progressRingLogic.size / minXYCoefficient}
						fill="none"
						strokeWidth="4"
						strokeMiterlimit="10"
					/>
				</svg>
			</div>
		)
	}

	if (!props.active) {
		return null
	}

	return (
		<div
			className={props.className}
			style={Object.assign({
				width: progressRingLogic.size,
				height: progressRingLogic.size,
			}, props.style)}
		>
			<svg
				className={
					`${styles['circular-' + (props.size || 'm')]} ${styles['circular']}`
				}
				viewBox={`
					${progressRingLogic.size / minXYCoefficient}
					${progressRingLogic.size / minXYCoefficient}
					${progressRingLogic.size + minSizeAddition}
					${progressRingLogic.size + minSizeAddition}
				`}
			>
				<circle
					cx={progressRingLogic.size + minSizeAddition / minXYCoefficient}
					cy={progressRingLogic.size + minSizeAddition / minXYCoefficient}
					r={progressRingLogic.size / minXYCoefficient}
					fill="none"
					strokeWidth={props.size === 'l' ? '6' : '4'}
					strokeMiterlimit="10"
				/>
			</svg>
		</div>
	)
}
