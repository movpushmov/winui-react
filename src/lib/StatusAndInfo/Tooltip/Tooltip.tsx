import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/TextBlock'
import { useTooltipLogic } from './useTooltipLogic'

export interface TooltipProps {
	visible?: boolean

	showTime?: number

	style?: CSSProperties
	className?: string

	content: React.ReactNode | string
	children: React.ReactNode
}

export function Tooltip(props: TooltipProps): React.ReactNode {
	const tooltipLogic = useTooltipLogic(props)

	return (
		<div className={styles['tooltip-container']}>
			<div
				style={props.style}
				className={`${props.className || ''} ${styles['tooltip-box']} ${
					tooltipLogic.show ? styles['visible'] : styles['hide']
				}`}
			>
				{typeof props.content === 'string' ?
					<TextBlock style={{ margin: 0 }}>{props.content}</TextBlock>
					: props.content}
			</div>

			<div
				onMouseEnter={tooltipLogic.onMouseEnterHandler}
				onMouseLeave={tooltipLogic.onMouseLeaveHandler}
			>
				{props.children}
			</div>
		</div>
	)
}
