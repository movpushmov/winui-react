import React, { useCallback, useState } from 'react'
import { TextBlock } from '../Text/TextBlock'
import styles from '../TextBox/styles.module.css'
import { Button } from '../../BasicInput/Button/Button'
import { Icon, IconType } from '../../Icons/Icon'
import { Flyout } from '../../DialogsAndFlyouts/Flyout/Flyout'

type InputProps =
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type DivProps =
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface TextBoxProps extends Omit<InputProps, 'type' | 'value' | 'defaultValue' | 'step'> {
	containerProps?: DivProps
	header?: string

	value?: number
	defaultValue?: number
	step?: number

	type?: 'inline' | 'compact'
}

const incrementModeTime = 500
const tickTime = 60
const minStep = 1

export const NumberBox = (props: TextBoxProps): React.ReactElement => {
	const {
		className: inputClassName,
		onChange,
		containerProps,
		header,
		value,
		type,
		style,
		defaultValue,
		...otherProps
	} = props

	const [visible, setIsVisible] = useState(false)
	const [currentValue, setValue] = useState<number | undefined>(value ?? defaultValue)

	const changerInterval = React.useRef(0)
	const [interval, setBoxInterval] = useState<number>()

	const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (value === void 0) {
			const parsedValue = parseInt(e.currentTarget.value, 10)

			setValue(isNaN(parsedValue) ? 0 : parsedValue)
		}

		onChange?.(e)
	}, [onChange, value])

	const onChangeVisibilityHandler = useCallback(() => setIsVisible(v => !v), [])

	const changeValue = useCallback((value: number, withTimeOut: boolean) => {
		const currValue = value ?? 0

		if (props.max !== void 0 && currValue + value > props.max) {
			return
		}

		if (props.min !== void 0 && currValue + value < props.min) {
			return
		}

		setValue(t => (t ?? 0) + value)

		if (withTimeOut) {
			setBoxInterval(
				setTimeout(
					() => changeValue(value, withTimeOut),
					tickTime,
				) as unknown as number,
			)
		}
	}, [props.max, props.min])

	const mouseDownIncrementHandler = useCallback(
		() => {
			changeValue(props.step ?? minStep, false)

			changerInterval.current = setTimeout(() => {
				changeValue(props.step ?? minStep, true)
			}, incrementModeTime) as unknown as number
		},
		[changeValue, props.step],
	)

	const mouseDownDecrementHandler = useCallback(
		() => {
			changeValue(-(props.step ?? minStep), false)

			changerInterval.current = setTimeout(() => {
				changeValue(-(props.step ?? minStep), true)
			}, incrementModeTime) as unknown as number
		},
		[changeValue, props.step],
	)

	const mouseUpHandler = useCallback(
		() => {
			clearTimeout(interval)
			clearTimeout(changerInterval.current)
		},
		[interval],
	)

	const onCloseHandler = useCallback(() => {
		mouseUpHandler()
		setIsVisible(false)
	}, [mouseUpHandler])

	let {
		containerClassName, otherContainerProps,
	}: {
		containerClassName?: string
		otherContainerProps?: Omit<DivProps, 'className'>
	} = {}

	if (containerProps) {
		({ className: containerClassName, ...otherContainerProps } = containerProps)
	}

	return (
		<div style={{ width: 'fit-content' }}>
			{header && <TextBlock type="body-strong">{header}</TextBlock>}

			<Flyout
				visible={visible}
				flyoutPosition="right"
				flyoutContent={
					<>
						<Button onMouseDown={mouseDownIncrementHandler} onMouseUp={mouseUpHandler}>
							<Icon type={IconType.ChevronUp}/>
						</Button>

						<Button onMouseDown={mouseDownDecrementHandler} onMouseUp={mouseUpHandler}>
							<Icon type={IconType.ChevronDown}/>
						</Button>
					</>
				}
				boxProps={{ className: styles['flyout'] }}
				onClose={onCloseHandler}
			>
				<div className={`${containerClassName || ''} ${styles['input-container']}`} {...otherContainerProps}>
					<input
						type="number"
						value={currentValue}
						style={Object.assign({
							padding: !type || type === 'compact' ?
								'8px 32px 8px 12px' : '8px 52px 8px 12px',
						}, style)}
						onChange={onChangeHandler}
						className={`${styles['input']} ${inputClassName || ''}`} {...otherProps}
					/>

					{!type || type === 'compact' ?
						<Button className={styles['btn']} onClick={onChangeVisibilityHandler}>
							<Icon type={IconType.ScrollUpDown}/>
						</Button>
						:
						<div className={styles['buttons-container']}>
							<Button onMouseDown={mouseDownIncrementHandler} onMouseUp={mouseUpHandler}>
								<Icon type={IconType.ChevronUp}/>
							</Button>

							<Button onMouseDown={mouseDownDecrementHandler} onMouseUp={mouseUpHandler}>
								<Icon type={IconType.ChevronDown}/>
							</Button>
						</div>
					}
				</div>
			</Flyout>
		</div>
	)
}
