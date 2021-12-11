import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/Text/TextBlock'

interface CheckBoxProps extends Omit<
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
'type' | 'value'
> {
	content?: string

	isThreeState?: boolean

	value?: CheckBoxState
	initialValue?: CheckBoxState

	onCheck?: (value: CheckBoxState) => void
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

	const toggleWithValueUndefined = useCallback(() => {
		if (props.isThreeState) {
			let newState = CheckBoxState.Checked

			switch (state) {
				case CheckBoxState.Unchecked: {
					newState = CheckBoxState.Checked
					break
				}
				case CheckBoxState.Checked: {
					newState = CheckBoxState.Indeterminate
					break
				}
				case CheckBoxState.Indeterminate: {
					newState = CheckBoxState.Unchecked
				}
			}

			props.onCheck?.(newState)
		} else {
			props.onCheck?.(
				state === CheckBoxState.Unchecked ?
					CheckBoxState.Checked : CheckBoxState.Unchecked,
			)
		}
	}, [props, state])

	const getNextValue = useCallback(() => {
		if (props.isThreeState) {
			switch (state) {
				case CheckBoxState.Unchecked: {
					return CheckBoxState.Checked
				}
				case CheckBoxState.Checked: {
					return CheckBoxState.Indeterminate
				}
				case CheckBoxState.Indeterminate: {
					return CheckBoxState.Unchecked
				}
			}
		} else if (state === CheckBoxState.Unchecked) {
			return CheckBoxState.Checked
		} else {
			return CheckBoxState.Unchecked
		}
	}, [props.isThreeState, state])

	const clickHandler = useCallback(() => {
		if (props.disabled) {
			return
		}

		if (props.value === void 0) {
			toggleWithValueUndefined()
		} else {
			props.onCheck?.(getNextValue())
		}

		setState(getNextValue())
	}, [getNextValue, props, toggleWithValueUndefined])

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
