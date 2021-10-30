import { useCallback, useEffect, useState } from 'react'
import { TooltipProps } from './Tooltip'

const oneSecond = 1

interface UseTooltipLogicResult {
	show: boolean
	onMouseLeaveHandler: () => void
	onMouseEnterHandler: () => void
}

export function useTooltipLogic(props: TooltipProps): UseTooltipLogicResult {
	const showTime = props.showTime !== void 0 ?
		props.showTime : oneSecond

	const [show, setShow] = useState(Boolean(props.visible))
	const [time, setTime] = useState(0)
	const [timeInterval, setTimeInterval] = useState<number>()

	useEffect(() => {
		if (props.visible !== void 0) {
			setShow(props.visible)
		}
	}, [props.visible])

	useEffect(() => {
		if (time === 0) {
			return
		}

		if (time >= showTime) {
			setShow(true)
			setTime(0)
		}

		setTimeInterval(
			setTimeout(
				() => setTime(time + oneSecond),
				1000,
			) as unknown as number,
		)
	}, [time, showTime])

	const onMouseEnterHandler = useCallback(() => {
		if (props.visible === void 0 && !show) {
			setTimeInterval(
				setTimeout(
					() => setTime(t => t + oneSecond),
					1000,
				) as unknown as number,
			)
		}

	}, [props.visible, show])

	const onMouseLeaveHandler = useCallback(() => {
		if (props.visible === void 0) {
			if (timeInterval) {
				clearTimeout(timeInterval)
				setTimeInterval(void 0)
			}

			setShow(false)
			setTime(0)
		}

	}, [props.visible, timeInterval])

	return {
		show,
		onMouseLeaveHandler,
		onMouseEnterHandler,
	}
}
