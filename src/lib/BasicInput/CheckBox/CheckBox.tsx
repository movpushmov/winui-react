import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/TextBlock'

interface CheckBoxProps extends Omit<
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
'type' | 'value'
> {
	content?: string

	isThreeState?: boolean

	value?: CheckBoxState
	initialValue?: CheckBoxState
}

export enum CheckBoxState {
	Unchecked,
	Checked,
	Indeterminate
}

export function CheckBox(props: CheckBoxProps): React.ReactElement {
	const [state, setState] = useState(
		props.value !== void 0 ?
			props.value : props.initialValue || CheckBoxState.Unchecked,
	)

	useEffect(() => {
		if (props.value !== void 0) {
			setState(props.value)
		}
	}, [props])

	const clickHandler = useCallback(() => {
		if (props.disabled || props.value !== void 0) {
			return
		}

		if (props.isThreeState) {
			switch (state) {
				case CheckBoxState.Unchecked: {
					setState(CheckBoxState.Checked)
					break
				}
				case CheckBoxState.Checked: {
					setState(CheckBoxState.Indeterminate)
					break
				}
				case CheckBoxState.Indeterminate: {
					setState(CheckBoxState.Unchecked)
				}
			}
		} else if (state === CheckBoxState.Unchecked) {
			setState(CheckBoxState.Checked)
		} else {
			setState(CheckBoxState.Unchecked)
		}
		// eslint-disable-next-line
	}, [])

	return (
		<div>
			<div
				className={`${styles['container']} ${props.className || ''}`}
				style={props.style}
				onClick={clickHandler}
			>
				<input
					className={styles['input']}
					checkbox-data={state}
					disabled={props.disabled}
					onChange={props.onChange}
				/>
				<span className={styles['checkmark']} />

				{props.content ? <TextBlock>{props.content}</TextBlock> : null}
			</div>
		</div>
	)
}
