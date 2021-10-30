import React, { useEffect, useState } from 'react'
import styles from '../ListView/styles.module.css'
import { ListViewProps } from '../ListView/ListView'
import { Key } from './TreeView'

export const TreeListView = (props: ListViewProps): React.ReactElement => {
	const [defaultProps, setDefaultProps] = useState(Object.assign({
		selectedItems: [],
		selectionMode: 'single',
	}, props))

	const [selectedKeys, setSelectedKeys] = useState<Key[]>(
		props.selectedItems ??
        defaultProps.defaultSelectedItems ??
        defaultProps.selectedItems,
	)


	const {
		children,
		className,
		onValueSelect,
		selectedItems,
		selectionMode,
		...otherProps
	} = props

	useEffect(() => {
		onValueSelect?.(selectedKeys)
	}, [onValueSelect, selectedKeys])

	useEffect(() => {
		setDefaultProps(Object.assign({
			selectedItems: [],
			selectionMode: 'single',
		}, props))

		if (props.selectedItems !== void 0) {
			setSelectedKeys(props.selectedItems)
		}
	}, [props])

	return (
		<ul className={`${styles['list-view']} ${className || ''}`} {...otherProps}>
			{children}
		</ul>
	)
}
