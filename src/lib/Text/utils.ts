import styles from './styles.module.css'
import React, { CSSProperties } from 'react'

export interface TextBlockPropsBase {
	style?: CSSProperties
	className?: string
	disabled?: boolean
	underline?: boolean
	accent?: boolean

	onClick?: (e: React.MouseEvent<HTMLHeadElement | HTMLParagraphElement>) => void
	children?: React.ReactNode
}

export default function getStyles(
	params: { accent?: boolean; disabled?: boolean; underline?: boolean }
): string {
	const postfix = params.disabled ? '-disabled' : '' // adds postfix to classname like accent-disabled

	return `${
		params.accent ? styles['accent' + postfix] : styles['default' + postfix]
	} ${params.underline ? styles['underline'] : ''}`
}
