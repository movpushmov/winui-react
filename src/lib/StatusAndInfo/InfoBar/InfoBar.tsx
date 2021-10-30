import React, { CSSProperties, useCallback, useState } from 'react'
import styles from './styles.module.css'
import { TextBlock } from '../../Text/TextBlock'
import { Icon, IconType } from '../../Icons/Icon'
import { InfoBarCloseButton } from './CloseButton'

interface InfoBarProps {
	className?: string
	style?: CSSProperties

	open?: boolean
	closable?: boolean
	iconVisible?: boolean

	title?: string
	message?: string

	onClick?: (e: React.MouseEvent) => void
	onClose?: () => void

	severity?: 'informational' | 'success' | 'warning' | 'error'

	layout?: 'row' | 'column'
}

const severityToBarProps = {
	'informational': {
		iconType: IconType.InfoBadge12,
		backgroundColor: 'var(--card-background-secondary)',
		iconColor: 'var(--system-attention)',
	},
	'success': {
		iconType: IconType.CheckMarkBadge12,
		backgroundColor: 'var(--infobar-success)',
		iconColor: 'var(--system-success)',
	},
	'warning': {
		iconType: IconType.ImportantBadge12,
		backgroundColor: 'var(--infobar-caution)',
		iconColor: 'var(--system-caution)',
	},
	'error': {
		iconType: IconType.ErrorBadge12,
		backgroundColor: 'var(--infobar-critical)',
		iconColor: 'var(--system-critical)',
	},
}

export function InfoBar(props: InfoBarProps): React.ReactElement {
	const defaultProps = Object.assign({
		severity: 'informational',
		layout: 'row',
		open: true,
	}, props)

	const [barOpen, setIsOpen] = useState(defaultProps.open !== void 0 ?
		defaultProps.open : false,
	)

	const onCloseHandler = useCallback(() => {
		if (props.open !== void 0) {
			return
		}

		if (defaultProps.onClose !== void 0) {
			defaultProps.onClose()
		} else {
			setIsOpen(false)
		}
	}, [defaultProps, props.open])

	if (defaultProps.layout === 'row') {
		return (
			<div
				onClick={defaultProps.onClick}
				className={`${styles['info-bar-container']} ${defaultProps.className || ''} ${styles['row']}`}
				style={Object.assign({
					backgroundColor: severityToBarProps[defaultProps.severity].backgroundColor,
					display: barOpen ? 'flex' : 'none',
				}, defaultProps.style)}
			>
				<div className={styles['row']} style={{ marginRight: '12px' }}>
					<div
						className={styles['info-bar-icon']}
						style={{
							backgroundColor: severityToBarProps[defaultProps.severity].iconColor,
						}}
					>
						<Icon type={severityToBarProps[defaultProps.severity].iconType} />
					</div>

					<TextBlock className={styles['info-bar-title']} type="body-strong">
						{props.title}
					</TextBlock>
				</div>

				{props.message ?
					<TextBlock style={{ margin: 0 }}>{props.message}</TextBlock> :
					null
				}

				{props.closable ?
					<InfoBarCloseButton onClick={onCloseHandler} /> :
					null
				}
			</div>
		)
	}
	return (
		<div
			onClick={defaultProps.onClick}
			className={`${styles['info-bar-container']} ${defaultProps.className || ''} ${styles['column']}`}
			style={Object.assign({
				backgroundColor: severityToBarProps[defaultProps.severity].backgroundColor,
				display: barOpen ? 'flex' : 'none',
			}, defaultProps.style)}
		>
			<div className={styles['row']}>
				<div
					className={styles['info-bar-icon']}
					style={{
						backgroundColor: severityToBarProps[defaultProps.severity].iconColor,
					}}
				>
					<Icon type={severityToBarProps[defaultProps.severity].iconType} />
				</div>

				<TextBlock className={styles['info-bar-title']} type="body-strong">
					{props.title}
				</TextBlock>

				{props.closable ?
					<InfoBarCloseButton onClick={onCloseHandler} /> :
					null
				}
			</div>

			{props.message ?
				<div className={styles['body-text-container']}>
					<TextBlock>{props.message}</TextBlock>
				</div>
				: null
			}
		</div>
	)

}
