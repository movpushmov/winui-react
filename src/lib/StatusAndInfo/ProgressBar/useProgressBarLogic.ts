import { ProgressBarProps } from './ProgressBar'
import { useEffect, useState } from 'react'

interface UseProgressBarLogicResult {
	state: 'running' | 'paused' | 'error'
	percentage: number
}

const minPercentage = 0
const maxPercentage = 100

export function useProgressBarLogic(props: ProgressBarProps): UseProgressBarLogicResult {
	const [percentage, setPercentage] = useState(0)
	const state = props.state || 'running'

	useEffect(() => {
		if (props.value && props.value > maxPercentage) {
			setPercentage(maxPercentage)
		} else if (props.value && props.value < minPercentage) {
			setPercentage(minPercentage)
		} else if (props.value) {
			setPercentage(props.value)
		}
	}, [props.value])

	return {
		state, percentage,
	}
}
