import React, { useCallback, useEffect, useState } from 'react'
import { Button } from '../Button/Button'

interface ToggleButtonProps extends Omit<
React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
'value'
> {
	disabled?: boolean
	initialValue?: boolean

	value?: boolean

	onToggle?: (value: boolean) => void
}

export function ToggleButton(props: ToggleButtonProps): React.ReactElement {
	const { onClick, initialValue, value, ...otherProps } = props
	const [toggled, setIsToggled] = useState(
		value !== void 0 ?
			value : Boolean(initialValue),
	)

	useEffect(() => {
		if (props.value !== void 0) {
			setIsToggled(props.value)
		}
	}, [props])

	useEffect(() => {
		if (props.onToggle && value === void 0) {
			props.onToggle(toggled)
		}
	}, [props, toggled, value])

	const clickHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(e)
		}

		if (value === void 0) {
			setIsToggled(!toggled)
		}
		// eslint-disable-next-line
	}, [])

	return (
		<Button
			{...otherProps}
			onClick={clickHandler}
			type={toggled ? 'accent' : 'default'}
		/>
	)
}
