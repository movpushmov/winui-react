import React from 'react'
import styles from '../SplitButton/styles.module.css'
import { Icon, IconType } from '../../Icons/Icon'
import { DropDown } from '../DropDownButton/DropDown'
import { ToggleButton } from '../ToggleButton/ToggleButton'
import { SplitButtonProps } from '../SplitButton/SplitButton'
import { useButtonLogic } from './useButtonLogic'

export interface DropDownButtonProps extends SplitButtonProps {
	initialValue?: boolean
	value?: boolean

	onToggle?: (value: boolean) => void
	emptyMessage?: string
}

export function ToggleSplitButton(props: DropDownButtonProps): React.ReactElement {
	const defaultProps = Object.assign({
		items: [],
		emptyMessage: 'Nothing to see',
	}, props)

	const {
		items,
		onSelect,
		className,
		children,

		// exclude onClick from otherProps
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		onClick,

		disabled,
		...otherProps
	} = defaultProps

	const buttonLogic = useButtonLogic(defaultProps)

	return (
		<div className={`${styles['dropdown']} ${defaultProps.className || ''}`}>
			<div className={`${styles['buttons-row']} ${className || ''}`} {...otherProps}>
				<ToggleButton
					value={buttonLogic.toggled}
					disabled={disabled}
					onClick={buttonLogic.toggleHandler}
					className={`${styles['content-button']}`}
					style={{ borderRight: 'none' }}
				>
					{children}
				</ToggleButton>

				<ToggleButton
					value={buttonLogic.toggled}
					disabled={disabled}
					className={`${styles['dropdown-button']} ${buttonLogic.animateIcon ? styles['animate-icon'] : ''}`}
					onClick={buttonLogic.toggleHandler}

					style={{
						padding: 0,
					}}
				>
					<div style={{
						width: 1,
						height: '100%',
						backgroundColor: buttonLogic.toggled ?
							'var(--control-stroke-on-accent-tertiary)' :
							'var(--control-stroke-default)',
					}}
					/>
					<Icon type={IconType.ChevronDown} style={{ padding: '4px 8px' }} />
				</ToggleButton>
			</div>

			<DropDown
				visible={buttonLogic.visible}
				close={buttonLogic.closeHandler}
				ref={buttonLogic.elementRef}
				emptyMessage={defaultProps.emptyMessage}
				onSelect={onSelect}
				items={items}
			/>
		</div>
	)
}
