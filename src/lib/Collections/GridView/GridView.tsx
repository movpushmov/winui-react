import React, { useEffect, useState } from 'react'
import { getHandler, SelectionMode } from '../ListView/ListView'
import styles from './styles.module.css'
import { Key } from '../TreeView/TreeView'
import { GridViewItem } from './GridViewItem'

export interface GridViewItemProps extends React.DetailedHTMLProps<
React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
	listKey?: string | number
	disabled?: boolean

	// private listview props
	selected?: boolean
	selectionMode?: SelectionMode
}

export interface GridViewProps extends Omit<
React.DetailedHTMLProps<
React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
>,
'children'
> {
	children?:
	React.ReactElement<GridViewItemProps> |
	React.ReactElement<GridViewItemProps>[]

	onValueSelect?: (selectedItems: Key[]) => void

	defaultSelectedItems?: Key[]
	selectedItems?: Key[]
	selectionMode?: SelectionMode
}

export const GridView = (props: GridViewProps): React.ReactElement => {
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

	function getChildren(): React.ReactElement<GridViewItemProps>[] {
		if (defaultProps.children) {
			return Array.isArray(defaultProps.children) ?
				defaultProps.children : [defaultProps.children]
		}
		return []

	}

	return (
		<div className={`${styles['grid-view']} `} {...otherProps}>
			{React.Children.map(getChildren(), (c, i) => {
				const { selected, listKey, onClick, disabled, ...otherProps } = c.props

				const onClickHandler = getHandler<HTMLDivElement>(
					selectedKeys, listKey ?? i,
					defaultProps.selectionMode,
					setSelectedKeys,
					disabled,
					defaultProps.selectedItems,
					onClick,
				)

				return (
					<GridViewItem
						selected={selected || selectedKeys.includes(listKey ?? i)}
						listKey={listKey}
						disabled={disabled}
						onClick={onClickHandler}
						selectionMode={props.selectionMode}
						{...otherProps}
					/>
				)
			})}
		</div>
	)
}
