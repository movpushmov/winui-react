import React, { useState } from 'react'
import { SliderProps } from './Slider'

type DefaultPropsType = {
	min: number
	max: number
	step: number
} & SliderProps

interface UseSliderLogicResult {
	currentValue: number
	visible: boolean

	getFillPercentage: () => number

	getGradient: () => string
	getTooltipTransform: () => string

	onMouseDownHandler: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
	onMouseUpHandler: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
	onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const maxPercentage = 100
const percentageCoefficient = -80
const offset = 8

export function useSliderLogic(defaultProps: DefaultPropsType): UseSliderLogicResult {
	const range = defaultProps.max - defaultProps.min

	const {
		value,
		initialValue,
		onChange,

		onMouseDown,
		onMouseUp,
	} = defaultProps

	const [currentValue, setCurrentValue] = useState(value ?? initialValue ?? 0)
	const [visible, setIsVisible] = useState(false)

	function getFillPercentage(): number {
		return (currentValue - defaultProps.min) * maxPercentage / range
	}

	function getGradient(): string {
		return `linear-gradient(to right, ${
			defaultProps.disabled ? 'var(--slider-disabled-thumb-color)' : 'var(--accent-color)'
		} ${getFillPercentage()}%, var(--fill-color-control-strong-default) ${getFillPercentage()}%)`
	}

	function onMouseDownHandler(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
		setIsVisible(true)

		onMouseDown?.(e)
	}

	function onMouseUpHandler(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
		setIsVisible(false)

		onMouseUp?.(e)
	}

	function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
		if (value === void 0) {
			setCurrentValue(parseInt(e.currentTarget.value, 10))
		}

		onChange?.(e)
	}

	// evil transform magic
	function getTooltipTransform(): string {
		const countedPercentage =
			getFillPercentage() * percentageCoefficient /
			(maxPercentage + defaultProps.min - offset)

		return `${countedPercentage}%`
	}

	return {
		currentValue,
		visible,
		getFillPercentage,
		getGradient,
		onMouseDownHandler,
		onMouseUpHandler,
		onChangeHandler,
		getTooltipTransform,
	}
}
