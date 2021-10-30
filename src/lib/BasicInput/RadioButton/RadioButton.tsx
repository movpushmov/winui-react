import React, { useCallback, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/TextBlock'

export interface RadioButtonProps extends Omit<
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
'type' | 'value'
> {
	content?: string

	initialValue?: boolean
	value?: boolean
}

export const RadioButton = (props: RadioButtonProps): React.ReactElement => {
	const {
		className,
		content,
		value,
		initialValue,
		onChange,
		...otherProps
	} = props
	const [currentValue, setValue] = useState(props.value ?? props.initialValue ?? false)

	useEffect(() => {
		if (props.value !== void 0) {
			setValue(props.value)
		}
	}, [props.value])

	const clickHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.value === void 0) {
			setValue(!currentValue)
		}

		return onChange?.(e)
		// eslint-disable-next-line
	}, [])

	return (
		<label className={styles['radio-label']} style={{ cursor: props.disabled ? 'default' : 'pointer' }}>
			<input
				type="radio"
				className={`${styles['radio']} ${className || ''}`}
				{...otherProps}
				checked={currentValue}
				onChange={clickHandler}
			/>

			<span className={styles['radio-button']}/>

			{content ? <TextBlock>{content}</TextBlock> : null}
		</label>
	)
}
