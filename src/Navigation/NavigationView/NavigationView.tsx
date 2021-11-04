import React, { CSSProperties, useCallback, useState } from 'react'
import { Icon, IconType } from '../../Icons/Icon'
import { TreeView } from '../../Collections/TreeView/TreeView'

import styles from '../../Collections/TreeView/styles.module.css'
import { Button } from '../../BasicInput/Button/Button'
import { NavigationViewItem } from './NavigationViewItem'

type Key = string | number

export type NavigationViewSelectEvent = {
	isSettings?: boolean
	selectedValues?: Key[]
}

export interface NavigationViewItemProps {
	title: string
	icon?: IconType
	value?: string

	children?: React.ReactElement<NavigationViewItemProps> | React.ReactElement<NavigationViewItemProps>[]
}

interface NavigationViewProps {
	open?: boolean

	toggleButtonEnabled?: boolean
	toggleButtonVisible?: boolean

	settingsEnabled?: boolean

	backButtonVisible?: boolean
	backButtonEnabled?: boolean

	position?: 'left' | 'top'

	className?: string
	style?: CSSProperties

	onSelect?: (e: NavigationViewSelectEvent) => void
	onBack?: () => void

	children?: React.ReactElement<NavigationViewItemProps> | React.ReactElement<NavigationViewItemProps>[]
}

export const NavigationView = (props: NavigationViewProps): React.ReactElement => {
	const defaultProps = Object.assign({
		backButtonEnabled: true,
		backButtonVisible: true,
		settingsEnabled: true,
		toggleButtonEnabled: true,
		toggleButtonVisible: true,
	}, props)

	const [open, setIsOpen] = useState(props.open ?? false)

	const toggleHandler = useCallback(() => setIsOpen(o => !o), [])

	const [selectedItems, setSelectedItems] = useState<Key[]>([])
	const [settingsSelected, setIsSettingsSelected] = useState<Key[]>([])

	const settingsSelectedHandler = useCallback(() => {
		props.onSelect?.({
			isSettings: true,
			selectedValues: ['settings'],
		})

		setIsSettingsSelected(['settings'])
		setSelectedItems([])
	}, [props])

	const itemsSelectedHandler = useCallback((items: (string | number)[]) => {
		props.onSelect?.({
			isSettings: false,
			selectedValues: items,
		})

		setIsSettingsSelected([])
		setSelectedItems(items)
	}, [props])

	return (
		<div className={styles[`navigation-view-${open ? 'expanded' : 'closed'}`]}>
			{defaultProps.backButtonVisible &&
				<Button
					onClick={defaultProps.onBack}
					disabled={!defaultProps.backButtonEnabled}
					className={styles['toggle-button']}
				>
					<Icon type={IconType.ChromeBack}/>
				</Button>
			}

			{defaultProps.toggleButtonVisible &&
				<Button
					onClick={toggleHandler}
					disabled={!defaultProps.toggleButtonEnabled}
					className={styles['toggle-button']}
				>
					<Icon type={IconType.GlobalNavButton}/>
				</Button>
			}

			<TreeView
				dropdownIconPosition="right"
				closeAllSubLists={!open}
				className={`${styles['items-list']} winui-scrollbar`}
				onValueSelect={itemsSelectedHandler}
				selectedItems={selectedItems}
			>
				{props.children}
			</TreeView>

			<TreeView
				dropdownIconPosition="right"
				onValueSelect={settingsSelectedHandler}
				selectedItems={settingsSelected}
			>
				<NavigationViewItem
					title="Settings"
					value="settings"
					icon={IconType.Settings}
				/>
			</TreeView>
		</div>
	)
}