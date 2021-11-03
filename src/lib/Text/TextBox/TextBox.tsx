import React, { useCallback, useState } from 'react'
import styles from './styles.module.css'
import { Button } from '../../BasicInput/Button/Button'
import { Icon, IconType } from '../../Icons/Icon'
import { TextBlock } from '../Text/TextBlock'

type InputProps =
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type DivProps =
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface TextBoxProps extends Omit<InputProps, 'type'> {
	containerProps?: DivProps
	type?: 'text' | 'password'

	header?: string
}

export const TextBox = (props: TextBoxProps): React.ReactElement => {
	const {
		className: inputClassName,
		type: inputType,
		onChange,
		containerProps,
		header,
		value,
		defaultValue,
		...otherProps
	} = props
	const [show, setIsShow] = useState(Boolean(value ?? defaultValue))

	const [currentValue, setValue] = useState(value ?? defaultValue ?? '')
	const [type, setType] = useState(inputType || 'text')

	const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (value === void 0) {
			setValue(e.currentTarget.value)
		}

		if (e.currentTarget.value && e.currentTarget.value.length > 0) {
			setIsShow(true)
		}

		onChange?.(e)
	}, [onChange, value])

	const clearHandler = useCallback(() => {
		setValue('')
		setIsShow(false)
	}, [])

	const mouseDownHandler = useCallback(() => setType('text'), [])
	const mouseUpHandler = useCallback(() => setType('password'), [])

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
		<div>
			{header && <TextBlock type="body-strong">{header}</TextBlock>}

			<div className={`${containerClassName || ''} ${styles['input-container']}`} {...otherContainerProps}>
				<input
					type={type}
					value={currentValue}
					onChange={onChangeHandler}
					className={`${styles['input']} ${inputClassName || ''}`} {...otherProps}
				/>
				{props.type === 'password' ?
					<Button
						className={styles['btn']}
						style={{ display: show ? void 0 : 'none' }}
						onMouseDown={mouseDownHandler}
						onMouseUp={mouseUpHandler}
					>
						<Icon type={IconType.RevealPasswordMedium}/>
					</Button>
					:
					<Button
						onClick={clearHandler}
						className={styles['btn']}
						style={{ display: show ? void 0 : 'none' }}
					>
						<Icon type={IconType.ErrorBadge12}/>
					</Button>
				}
			</div>
		</div>
	)
}

