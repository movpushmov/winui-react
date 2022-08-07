import React, { useCallback, useEffect, useState } from 'react'
import { DropDownButtonProps } from './ToggleSplitButton'

interface UseButtonLogicResult {
	toggled: boolean
	visible: boolean
	animateIcon: boolean

	closeHandler: () => void
	openHandler: () => void
	toggleHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
}

type PropsType = {
	items: never[]
	emptyMessage: string
} & DropDownButtonProps

export function useButtonLogic(props: PropsType): UseButtonLogicResult {
	const [toggled, setIsToggled] = useState(
		props.value ?? Boolean(props.initialValue),
	)
	const [visible, setIsVisible] = useState(false)
	const [animateIcon, setIsAnimateIcon] = useState(false)

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

	const toggleHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		if (props.onClick) {
			props.onClick(e)
		}

		if (props.value === void 0) {
			setIsToggled(t => !t)
		}

	}, [props])

	const openHandler = useCallback(() => setIsVisible(true), [])
	const closeHandler = useCallback(() => setIsVisible(false), [])

	return {
		toggled,
		visible,
		animateIcon,
		toggleHandler,
		closeHandler,
		openHandler,
	}
}
