import React, { useCallback, useEffect, useState } from 'react'
import { DropDownButtonProps } from './ToggleSplitButton'
import { useOuterClick } from '../../utils/useOuterClick'

interface UseButtonLogicResult {
	elementRef: React.Ref<HTMLDivElement>

	toggled: boolean
	visible: boolean
	animateIcon: boolean

	closeHandler: () => void
	toggleHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

type PropsType = {
	items: never[]
	emptyMessage: string
} & DropDownButtonProps

export function useButtonLogic(props: PropsType): UseButtonLogicResult {
	const [toggled, setIsToggled] = useState(
		props.value ?? Boolean(props.initialValue)
	)
	const [visible, setIsVisible] = useState(false)
	const [animateIcon, setIsAnimateIcon] = useState(false)

	const elementRef = useOuterClick(() => setIsVisible(false))

	useEffect(() => {
		setIsAnimateIcon(false)

		if (visible) {
			setIsAnimateIcon(true)
		}
	}, [visible])

	useEffect(() => {
		if (!props.disabled && props.onToggle) {
			props.onToggle(toggled)
		}
	},[toggled, props])

	const toggleHandler = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (props.onClick) {
			props.onClick(e)
		}

		if (props.value === void 0) {
			setIsToggled(t => !t)
		}
	}, [])

	const closeHandler = useCallback(() => setIsToggled(false), [])

	return {
		elementRef,
		toggled,
		visible,
		animateIcon,
		toggleHandler,
		closeHandler,
	}
}
