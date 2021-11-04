import { ListViewItemProps } from './ListView'
import styles from './styles.module.css'
import { CheckBox, CheckBoxState } from '../../BasicInput/CheckBox/CheckBox'
import React from 'react'

export const ListViewItem = (props: ListViewItemProps): React.ReactElement => {
	const {
		selectionMode,
		selected,
		disabled,
		className,
		children,
		checkBoxState,
		listKey,
		...otherProps
	} = props

	function getClassName(): string {
		let base = 'list-view-item'

		if (selected) {
			base += '-selected'
		}

		if (disabled) {
			base += '-disabled'
		}

		return base
	}

	return (
		<li
			className={`${styles[getClassName()]} ${className || ''}`}
			{...otherProps}
		>
			{selectionMode === 'multiply' ?
				<CheckBox
					disabled={disabled}
					value={
						checkBoxState ?? (selected ? CheckBoxState.Checked : CheckBoxState.Unchecked)
					}
				/>
				: null}

			{children}
		</li>
	)
}
