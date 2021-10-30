import React, { useEffect, useRef } from 'react'

export function useOuterClick(callback?: (e: Event) => void): React.Ref<HTMLDivElement> {
	const innerRef = useRef<HTMLDivElement>(null) // returned to client, who marks "border" element

	useEffect(() => {
		function clickHandler(e: Event): void {
			if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
				callback?.(e)
			}
		}

		document.addEventListener('click', clickHandler)
		return () => document.removeEventListener('click', clickHandler)
	}, [callback]) // no dependencies -> stable click listener

	return innerRef // convenience for client (doesn't need to init ref himself)
}
