import React, { HTMLAttributes, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/Text/TextBlock'

type DivPropsType = React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
type Position = 'top' | 'bottom' | 'left' | 'right'

interface FlyoutProps extends DivPropsType {
	flyoutPosition?: Position
	flyoutContent?: string | React.ReactNode
	visible: boolean

	onClose?: (e: Event) => void

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

	const [containerClass, setContainerClass] = useState(styles['base-class'])

	function getFlyoutBoxClassName(visible?: boolean, className?: string): string {
		const boxPositionName = styles[`flyout-box-${flyoutPosition}`]
		const boxVisibilityName = visible ?
			styles[`visible-${flyoutPosition}`] :
			styles[`hide-${flyoutPosition}`]

		return `${boxPositionName || ''} ${boxVisibilityName || ''} ${className || ''}`
	}

	useEffect(() => {
		if (containerClass === styles['base-class'] && !props.visible) {
			return
		}

		if (boxProps) {
			setContainerClass(getFlyoutBoxClassName(props.visible, boxProps.className))
		} else {
			setContainerClass(getFlyoutBoxClassName(props.visible))
		}
	}, [boxProps, getFlyoutBoxClassName, props.visible])

	return (
		<div className={styles['flyout-container']} {...otherProps}>
			<div {...(boxProps ?? {})} className={containerClass}>
				{typeof props.flyoutContent === 'string' ?
					<TextBlock style={{ margin: 0 }}>{props.flyoutContent}</TextBlock>
					: props.flyoutContent}
			</div>

			{props.children}
		</div>
	)
}
