import React, { useCallback, useState } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/TextBlock'

interface ToggleSwitchProps extends Omit<
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
'type' | 'value'
> {
	header?: string
	offContent?: string
	onContent?: string

	initialValue?: boolean
	value?: boolean
	onToggled?: (value: boolean) => void
}

export function ToggleSwitch(props: ToggleSwitchProps): React.ReactElement {
	const [toggled, setIsToggled] = useState(props.value ?? props.initialValue ?? false)
	const onToggledHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		if (props.onToggled) {
			props.onToggled(!toggled)
		}

		if (props.value === void 0) {
			setIsToggled(!toggled)
		}

		return props.onChange?.(e)
	}, [props, toggled])

	return (
		<div style={props.style} className={props.className}>
			{props.header ?
				<TextBlock type="body-strong">{props.header}</TextBlock> :
				null
			}

			<div className={styles['row-block']}>
				<label className={styles['switch']}>
					<input
						disabled={props.disabled}
						checked={toggled}
						onChange={onToggledHandler}
						type="checkbox"
						className={styles['input']}
					/>
					<span className={styles['slider']}/>
				</label>

				{props.onContent || props.offContent ?
					<TextBlock>{toggled ? props.onContent : props.offContent}</TextBlock>
					: null}
			</div>
		</div>
	)
}
