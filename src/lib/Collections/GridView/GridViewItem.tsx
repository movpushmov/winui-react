import { GridViewItemProps } from './GridView'
import React from 'react'
import styles from './styles.module.css'
import { CheckBox, CheckBoxState } from '../../BasicInput/CheckBox/CheckBox'

export const GridViewItem = (props: GridViewItemProps): React.ReactElement => {
	const {
		selectionMode,
		selected,
		disabled,
		className,
		children,
		listKey,
		...otherProps
	} = props

	function getClassName(): string {
		let base = 'grid-view-item'

		if (selected) {
			base += '-selected'
		}

		if (disabled) {
			base += '-disabled'
		}

		return base
	}

	return (
		<div
			className={`${styles[getClassName()]} ${className || ''}`}
			{...otherProps}
		>
			{selectionMode === 'multiply' ?
				<CheckBox
					disabled={disabled}
					className={styles['check-box']}
					value={selected ? CheckBoxState.Checked : CheckBoxState.Unchecked}
				/>
				: null}

			{children}
		</div>
	)
}
