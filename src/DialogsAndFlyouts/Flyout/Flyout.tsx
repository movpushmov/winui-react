import React, { HTMLAttributes, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/Text/TextBlock'
import { useOuterClick } from '../../utils/useOuterClick'

type DivPropsType = React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
type Position = 'top' | 'bottom' | 'left' | 'right'

interface FlyoutProps extends DivPropsType {
	flyoutPosition?: Position
	flyoutContent?: string | React.ReactNode
	visible: boolean

	onClose?: () => void

	boxProps?: DivPropsType
}

export const Flyout = (props: FlyoutProps): React.ReactElement => {
	const {
		flyoutContent,
		flyoutPosition = 'top',
		onClose,
		boxProps,
		visible,
		...otherProps
	} = props

	const elementRef = useOuterClick(() => {
		if (props.visible) {
			onClose?.()
		}
	})

	function getFlyoutBoxClassName(visible?: boolean, className?: string): string {
		const boxPositionName = styles[`flyout-box-${flyoutPosition}`]
		const boxVisibilityName = visible ?
			styles[`visible-${flyoutPosition}`] :
			styles[`hide-${flyoutPosition}`]

		return `${boxPositionName || ''} ${boxVisibilityName || ''} ${className || ''}`
	}

	if (boxProps) {
		const {
			className,
			ref,
			...otherBoxProps
		} = boxProps

		const classNames = getFlyoutBoxClassName(props.visible, className)

		return (
			<div className={styles['flyout-container']} {...otherProps}>
				<div
					{...otherBoxProps}
					ref={elementRef}
					className={classNames}
				>
					{typeof props.flyoutContent === 'string' ?
						<TextBlock style={{ margin: 0 }}>{props.flyoutContent}</TextBlock>
						: props.flyoutContent}
				</div>

				{props.children}
			</div>
		)
	}

	const classNames = getFlyoutBoxClassName(props.visible)

	return (
		<div className={styles['flyout-container']} {...otherProps}>
			<div
				ref={elementRef}
				className={classNames}
			>
				{typeof props.flyoutContent === 'string' ?
					<TextBlock style={{ margin: 0 }}>{props.flyoutContent}</TextBlock>
					: props.flyoutContent}
			</div>

			{props.children}
		</div>
	)
}
