import React from 'react'
import styles from './styles.module.css'
import { Tooltip } from '../../StatusAndInfo/Tooltip/Tooltip'
import { TextBlock } from '../../Text/TextBlock'
import { useSliderLogic } from './useSliderLogic'

export interface SliderProps extends Omit<
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
'type'
> {
	step?: number

	value?: number
	initialValue?: number

	header?: string
}

export const Slider = (props: SliderProps): React.ReactElement => {
	const defaultProps = Object.assign({
		min: 0,
		max: 100,

		step: 1,
	}, props)

	const sliderLogic = useSliderLogic(defaultProps)

	const {
		className,
		style,
		...otherProps
	} = defaultProps

	return (
		<>
			{defaultProps.header ? <TextBlock>{defaultProps.header}</TextBlock> : null}

			<Tooltip
				content={sliderLogic.currentValue}
				visible={sliderLogic.visible}
				className={styles['tooltip']}
				style={{
					left: `${sliderLogic.getFillPercentage()}%`,
					transform: `translate(${sliderLogic.getTooltipTransform()}, -40%)`,
				}}
			>
				<div
					className={`${styles['slider']} ${className || ''}`}
					style={style}
				>
					<input
						{...otherProps}

						style={{
							background: sliderLogic.getGradient(),
						}}
						type="range"
						value={sliderLogic.currentValue}

						onMouseDown={sliderLogic.onMouseDownHandler}
						onMouseUp={sliderLogic.onMouseUpHandler}
						onChange={sliderLogic.onChangeHandler}
					/>
				</div>
			</Tooltip>
		</>
	)
}
