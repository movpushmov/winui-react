import React from 'react'
import styles from './styles.module.css'
import getStyles, { TextBlockPropsBase } from './utils'

interface TextBlockProps extends TextBlockPropsBase{
	type?:
	'subtitle' | 'title' |
	'title-large' | 'display'
}

export function TitleBlock(props: TextBlockProps): React.ReactElement {
	const defaultProps: TextBlockProps = Object.assign({
		type: 'subtitle',
		className: '',
	}, props)

	const {
		className,
		type,
		children,
		...otherProps
	} = defaultProps

	switch (type) {
		case 'title':
			return (
				<h3
					{...otherProps}
					className={`${styles['title']} ${getStyles(defaultProps)} ${className || ''}`}
				>
					{children || ' '}
				</h3>
			)
		case 'title-large':
			return (
				<h2
					{...otherProps}
					className={`${styles['title-large']} ${getStyles(defaultProps)} ${className || ''}`}
				>
					{children || ' '}
				</h2>
			)
		case 'display':
			return (
				<h1
					{...otherProps}
					className={`${styles['display']} ${getStyles(defaultProps)} ${className || ''}`}
				>
					{children || ' '}
				</h1>
			)
	}

	// if type is subtitle or undefined
	return (
		<h4
			{...otherProps}
			className={`${styles['subtitle']} ${getStyles(defaultProps)} ${className || ''}`}
		>
			{children || ' '}
		</h4>
	)
}
