import { useEffect, useState } from 'react'
import { ProgressRingProps } from './ProgressRing'

const letterToSize = {
	s: 16,
	m: 32,
	l: 64,
}

const minPercentage = 0
const maxPercentage = 100

interface UseProgressRingLogicResult {
	percentage: number
	length: number
	size: number
	refLoaded: (ref: SVGCircleElement | null) => void
}

export function useProgressRingLogic(props: ProgressRingProps): UseProgressRingLogicResult {
	const [percentage, setPercentage] = useState(0)
	const [svgLength, setLength] = useState(0)

	const [size, setSize] = useState(letterToSize[props.size || 'm'])

	useEffect(() => {
		setSize(letterToSize[props.size || 'm'])
	}, [props.size])

	useEffect(() => {
		if (props.value && props.value > maxPercentage) {
			setPercentage(maxPercentage)
		} else if (props.value && props.value < minPercentage) {
			setPercentage(minPercentage)
		} else if (props.value) {
			setPercentage(props.value)
		}
	}, [props.value])

	function refLoaded(ref: SVGCircleElement | null): void {
		if (ref) {
			setLength(ref.getTotalLength())
		}
	}

	return {
		percentage,
		length: svgLength,
		size,
		refLoaded,
	}
}
