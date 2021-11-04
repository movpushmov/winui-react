import React, { useEffect } from 'react'
import { DialogSectionProps } from './ContentDialogSection'

import styles from './styles.module.css'
import { TitleBlock } from '../../Text/Text/TitleBlock'
import { ButtonProps } from '../../BasicInput/Button/Button'

interface ContentDialogProps {
	visible: boolean

	title: string
	children:
	React.ReactElement<DialogSectionProps> |
	[React.ReactElement<DialogSectionProps>, React.ReactElement<DialogSectionProps>]
}

function getButtonCount(children?: ButtonProps | ButtonProps[]): number {
	if (Array.isArray(children)) {
		return children.length
	}

	if (children === void 0) {
		return 0
	}

	return [children].length
}

export const ContentDialog = (props: ContentDialogProps): React.ReactElement => {
	useEffect(() => {
		document.body.style.overflow = props.visible ? 'hidden' : ''
	}, [props.visible])

	return (
		<div className={`${styles['modal-background']} ${props.visible ? styles['visible'] : styles['hidden']}`}>
			<div className={styles['modal-block']}>
				<TitleBlock type="subtitle">{props.title}</TitleBlock>

				{React.Children.map(props.children, child => {
					switch (child.props.type) {
						case 'content': {
							return (
								<div className={styles['modal-content']}>
									{child.props.children}
								</div>
							)
						}
						case 'actions': {
							return (
								<div
									className={styles['modal-actions']}
									style={{
										gridTemplateColumns: `repeat(${getButtonCount(child.props.children)}, 1fr)`,
									}}
								>
									{child.props.children}
								</div>
							)
						}
					}
				})}
			</div>
		</div>
	)
}
