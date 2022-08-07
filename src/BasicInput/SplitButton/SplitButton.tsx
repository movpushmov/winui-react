import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'
import styles from './styles.module.css'
import { Icon, IconType } from '../../Icons/Icon'
import { DropDown } from '../DropDownButton/DropDown'

export type DropDownItem = {
	icon?: IconType
	name: string
	value?: any
}

export interface SplitButtonProps {
	items?: DropDownItem[] | React.ReactElement[]
	emptyMessage?: string

	onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
	onSelect?: (value: any) => void

	className?: string
	style?: CSSProperties

	children?: React.ReactNode
	disabled?: boolean
}

export function SplitButton(props: SplitButtonProps): React.ReactElement {
	const defaultProps = Object.assign({
		items: [],
		emptyMessage: 'Nothing to see.',
		className: '',
	}, props)

	const { items, emptyMessage, onSelect, ...otherProps } = defaultProps
	const containerRef = useRef<HTMLDivElement>(null)

	const [visible, setIsVisible] = useState(false)
	const [animateIcon, setIsAnimateIcon] = useState(false)

	useEffect(() => {
		setIsAnimateIcon(false)

		if (visible) {
			setIsAnimateIcon(true)
		}
	}, [visible])

	const visibilityToggleHandler = useCallback(
		() => setIsVisible(v => !v),
		[],
	)

	const closeHandler = useCallback((e: Event) => setIsVisible(isVisible => {
		if (containerRef.current?.contains(e.target as HTMLElement)) {
			return isVisible
		}

		return !isVisible
	}), [])

	return (
		<div className={`${styles['dropdown']} ${defaultProps.className}`}>
			<div className={styles['buttons-row']} ref={containerRef}>
				<Button
					{...otherProps}
					className={`${styles['content-button']}`}
				/>

				<Button
					disabled={otherProps.disabled}
					className={`${styles['dropdown-button']} ${animateIcon ? styles['animate-icon'] : ''}`}
					onClick={visibilityToggleHandler}
				>
					<Icon type={IconType.ChevronDown} />
				</Button>
			</div>

			<DropDown
				visible={visible}
				close={closeHandler}
				emptyMessage={defaultProps.emptyMessage}
				onSelect={onSelect}
				items={items}
			/>
		</div>
	)
}
