import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { CheckBoxState } from '../../BasicInput/CheckBox/CheckBox'
import { ListViewItem } from './ListViewItem'
import { Key } from '../TreeView/TreeView'

export type SelectionMode = 'none' | 'single' | 'multiply'

export interface ListViewItemProps extends React.DetailedHTMLProps<
React.BaseHTMLAttributes<HTMLLIElement>, HTMLLIElement
> {
	listKey?: string | number
	disabled?: boolean

	selected?: boolean
	selectionMode?: SelectionMode

	checkBoxState?: CheckBoxState
}

export interface ListViewProps extends Omit<
React.DetailedHTMLProps<
React.BaseHTMLAttributes<HTMLUListElement>, HTMLUListElement
>,
'children'
> {
	children?:
	React.ReactElement<ListViewItemProps> |
	React.ReactElement<ListViewItemProps>[]

	onValueSelect?: (selectedItems: Key[]) => void

	defaultSelectedItems?: (string | number)[]
	selectedItems?: (string | number)[]
	selectionMode?: SelectionMode
}

export function getHandler<T>(
	selectedKeys: Key[],
	key: Key,
	selectionMode: SelectionMode,
	setSelectedKeys: React.Dispatch<React.SetStateAction<Key[]>>,

	disabled?: boolean,
	propsSelectedItems?: Key[],
	onClick?: React.MouseEventHandler<T>,
): React.MouseEventHandler<T> {
	return e => {
		onClick?.(e)

		if (
			selectedKeys.includes(key) && selectionMode === 'single' ||
			disabled
		) {
			return
		}

		switch (selectionMode) {
			case 'none': {
				return
			}
			case 'single': {
				if (propsSelectedItems !== void 0) {
					return
				}

				setSelectedKeys([key])
				break
			}
			case 'multiply': {
				if (selectedKeys.includes(key)) {
					setSelectedKeys(
						selectedKeys.filter(k => k !== key),
					)
				} else {
					setSelectedKeys(selectedKeys.concat(key))
				}

				break
			}
		}
	}
}

export const ListView = (props: ListViewProps): React.ReactElement => {
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

	function getChildren(): React.ReactElement<ListViewItemProps>[] {
		if (defaultProps.children) {
			return Array.isArray(defaultProps.children) ?
				defaultProps.children : [defaultProps.children]
		}
		return []

	}

	return (
		<ul className={`${styles['list-view']} ${className || ''}`} {...otherProps}>
			{React.Children.map(getChildren(), (c, i) => {
				const {
					selected,
					listKey,
					onClick,
					disabled,
					...otherProps
				} = c.props

				const onClickHandler = getHandler<HTMLLIElement>(
					selectedKeys, listKey ?? i,
					defaultProps.selectionMode,
					setSelectedKeys,
					disabled,
					props.selectedItems,
					onClick,
				)

				return (
					<ListViewItem
						selected={selected || selectedKeys.includes(listKey ?? i)}
						listKey={listKey}
						disabled={disabled}
						onClick={onClickHandler}
						selectionMode={props.selectionMode}
						{...otherProps}
					/>
				)
			})}
		</ul>
	)
}

