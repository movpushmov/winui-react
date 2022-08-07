import React, { useCallback, useState } from 'react'
import styles from '../TextBox/styles.module.css'
import { Button } from '../../BasicInput/Button/Button'
import { Icon, IconType } from '../../Icons/Icon'
import { TextBlock } from '../Text/TextBlock'

type TextAreaProps =
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type DivProps =
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

interface RichTextBoxProps extends Omit<TextAreaProps, 'type'> {
	containerProps?: DivProps
	type?: 'text' | 'password'

	enableClearButton?: boolean
	header?: string
}

export const RichTextBox = (props: RichTextBoxProps): React.ReactElement => {
	const {
		className: inputClassName,
		type: inputType,
		onChange,
		containerProps,
		enableClearButton,
		header,
		value,
		defaultValue,
		...otherProps
	} = props
	const [show, setIsShow] = useState(Boolean(value ?? defaultValue))

	const [currentValue, setValue] = useState(value ?? defaultValue ?? '')

	const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
				<textarea
					value={currentValue}
					onChange={onChangeHandler}
					className={`${styles['input']} ${inputClassName || ''}`} {...otherProps}
				/>
				<Button
					onClick={clearHandler}
					className={styles['btn']}
					style={{ display: show && enableClearButton ? void 0 : 'none' }}
				>
					<Icon type={IconType.ErrorBadge12}/>
				</Button>
			</div>
		</div>
	)
}

