import React, { CSSProperties, HTMLAttributes } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/TextBlock'
import { useOuterClick } from '../../utils/useOuterClick'

type DivPropsType = React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface FlyoutProps extends DivPropsType {
	flyoutPosition?: 'top' | 'bottom' | 'left' | 'right'
	flyoutContent?: string | React.ReactNode
	visible: boolean

	onClose?: () => void

	boxProps?: DivPropsType
}

export const Flyout = (props: FlyoutProps): React.ReactElement => {
	const defaultProps = Object.assign({
		flyoutPosition: 'top',
	}, props)

	const { flyoutContent, flyoutPosition, onClose, boxProps, ...otherProps } = defaultProps

	const elementRef = useOuterClick(() => {
		if (props.visible) {
			onClose?.()
		}
	})

	function getFlyoutBoxClassName(visible?: boolean, className?: string): string {
		const position = defaultProps.flyoutPosition

		const boxPositionName = styles[`flyout-box-${position}`]
		const boxVisibilityName = visible ? styles[`visible-${position}`] : styles[`hide-${position}`]

		return `${boxPositionName} ${boxVisibilityName} ${className || ''}`
	}

	if (boxProps) {
		const {
			className,
			ref,
			...otherBoxProps
		} = boxProps

		return (
			<div className={styles['flyout-container']} {...otherProps}>
				<div
					{...otherBoxProps}
					ref={elementRef}
					className={getFlyoutBoxClassName(props.visible, className)}
				>
					{typeof props.flyoutContent === 'string' ?
						<TextBlock style={{ margin: 0 }}>{props.flyoutContent}</TextBlock>
						: props.flyoutContent}
				</div>

				{defaultProps.children}
			</div>
		)
	}

	return (
		<div className={styles['flyout-container']} {...otherProps}>
			<div
				ref={elementRef}
				className={`${styles['flyout-box']} ${props.visible ? styles['visible'] : styles['hide']}`}
			>
				{typeof props.flyoutContent === 'string' ?
					<TextBlock style={{ margin: 0 }}>{props.flyoutContent}</TextBlock>
					: props.flyoutContent}
			</div>

			{defaultProps.children}
		</div>
	)
}
