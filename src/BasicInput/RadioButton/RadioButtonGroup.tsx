import React, { useState } from 'react'
import { RadioButton, RadioButtonProps } from './RadioButton'

import styles from './styles.module.css'

interface RadioButtonGroupProps extends React.DetailedHTMLProps<
React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
	children?: React.ReactElement<RadioButtonProps> | React.ReactElement<RadioButtonProps>[]
}

const initialRadioIndex = -1

function getOnChangeHandler(
	index: number,
	setSelectedRadio: React.Dispatch<React.SetStateAction<number>>,
	onChange?: React.ChangeEventHandler<HTMLInputElement>,
) {
	return (e: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedRadio(index)

		return onChange?.(e)
	}
}

export const RadioButtonGroup = (props: RadioButtonGroupProps): React.ReactElement | null => {
	const [selectedRadio, setSelectedRadio] = useState(initialRadioIndex)
	const { children, className, ...otherProps } = props

	if (!children) {
		return null
	}

	function returnGroup(radioButtons: React.ReactElement<RadioButtonProps>[]): React.ReactNode {
		return React.Children.map(radioButtons, (child, index) => {
			const { checked, onChange, ...otherChildProps } = child.props

			if (checked && index !== selectedRadio) {
				setSelectedRadio(index)
			}

			const handler = getOnChangeHandler(index, setSelectedRadio, onChange)

			return (
				<RadioButton
					{...otherChildProps}
					value={index === selectedRadio}
					onChange={handler}
				/>
			)
		})
	}

	return (
		<div
			className={`${styles['radio-buttons-group']} ${className || ''}`}
			{...otherProps}
		>
			{Array.isArray(children) ? returnGroup(children) : returnGroup([children])}
		</div>
	)
}
