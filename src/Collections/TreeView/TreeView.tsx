import { Icon, IconType } from '../../Icons/Icon'
import React, { useCallback, useEffect, useState } from 'react'
import { SelectionMode } from '../ListView/ListView'
import { ListViewItem } from '../ListView/ListViewItem'
import { TreeListView } from './TreeListView'
import { CheckBoxState } from '../../BasicInput/CheckBox/CheckBox'

import styles from './styles.module.css'
import { Button } from '../../BasicInput/Button/Button'
import { TextBlock } from '../../Text/Text/TextBlock'

export type Key = string | number

export interface PublicTreeNodeProps {
	icon?: IconType
	title: string

	value?: string
	children?: React.ReactElement<PublicTreeNodeProps> | React.ReactElement<PublicTreeNodeProps>[]
}


export interface TreeViewProps extends Omit<
React.DetailedHTMLProps<
React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
>,
'children'
> {
	children?:
	React.ReactElement<PublicTreeNodeProps> |
	React.ReactElement<PublicTreeNodeProps>[]

	onValueSelect?: (selectedItems: Key[]) => void

	defaultSelectedItems?: Key[]
	selectedItems?: Key[]
	selectionMode?: SelectionMode

	dropdownIconPosition?: 'left' | 'right'
	closeAllSubLists?: boolean
}

interface TreeViewNode {
	root?: boolean

	icon?: IconType
	title: string

	value: Key
	childrenValues: Key[]

	children?: TreeViewNode[]
}

export const TreeView = (props: TreeViewProps): React.ReactElement => {
	const [defaultProps, setDefaultProps] = useState(Object.assign({
		selectedItems: [],
		selectionMode: 'single',
		dropdownIconPosition: 'left',
	}, props))

	const {
		children,
		onValueSelect,
		defaultSelectedItems,
		selectedItems,
		selectionMode,
		dropdownIconPosition,
		closeAllSubLists,

		...otherProps
	} = props

	const [selectedKeys, setSelectedKeys] = useState(
		props.selectedItems ??
		props.defaultSelectedItems ??
		defaultProps.selectedItems,
	)

	useEffect(() => {
		if (props.selectedItems !== void 0) {
			setSelectedKeys(
				props.selectedItems,
			)
		}
	}, [props.selectedItems])

	const [treeNodes, setNodes] = useState<TreeViewNode[]>([])

	useEffect(() => {
		setDefaultProps(Object.assign({
			selectedItems: [],
			selectionMode: 'single',
			dropdownIconPosition: 'left',
		}, props))
	}, [props])

	function multiplyHandler(keys: Key[], checkBoxState?: CheckBoxState): void {
		const keysToAdd: Key[] = []
		const keysToFilter: Key[] = []

		switch (checkBoxState) {
			case CheckBoxState.Unchecked: {
				keysToAdd.push(...keys)

				break
			}
			case CheckBoxState.Checked: {
				keysToFilter.push(...keys)

				break
			}
			case CheckBoxState.Indeterminate: {
				for (const key of keys) {
					if (!selectedKeys.includes(key)) {
						keysToAdd.push(key)
					}
				}

				break
			}

			case void 0: {
				for (const key of keys) {
					if (!selectedKeys.includes(key)) {
						keysToAdd.push(key)
					} else {
						keysToFilter.push(key)
					}
				}
			}
		}

		const newKeys = selectedKeys
			.concat(keysToAdd)
			.filter(k => !keysToFilter.includes(k))

		setSelectedKeys(newKeys)
	}

	function selectHandler(keys: Key[], checkBoxState?: CheckBoxState): void {
		props.onValueSelect?.(keys)

		switch (defaultProps.selectionMode) {
			case 'single': {
				if (props.selectedItems !== void 0) {
					return
				}

				setSelectedKeys(keys)
				break
			}
			case 'multiply': {
				multiplyHandler(keys, checkBoxState)
				break
			}
		}
	}

	const getChildren = useCallback(() => {
		if (defaultProps.children) {
			return Array.isArray(defaultProps.children) ?
				defaultProps.children : [defaultProps.children]
		}
		return []
	}, [defaultProps.children])

	const getNodeProps = useCallback((node: React.ReactElement<PublicTreeNodeProps>, index: number) => {
		const currentObject: TreeViewNode = {
			title: node.props.title,
			icon: node.props.icon,
			value: node.props.value ?? index,
			childrenValues: [],
		}

		if (Array.isArray(node.props.children)) {
			currentObject.children = React
				.Children
				.map(node.props.children, (c, i) =>
					getNodeProps(c, i),
				)

			for (const treeNode of currentObject.children) {
				currentObject.childrenValues = currentObject
					.childrenValues
					.concat(treeNode.childrenValues)
			}
		} else if (!Array.isArray(node.props.children) && node.props.children) {
			currentObject.children = [getNodeProps(node.props.children, 0)]

			for (const treeNode of currentObject.children) {
				currentObject.childrenValues = currentObject
					.childrenValues
					.concat(treeNode.childrenValues)
			}
		} else if (!node.props.children) {
			currentObject.childrenValues = [currentObject.value]
		}

		return currentObject
	}, [])

	useEffect(() => {
		const nodes: TreeViewNode[] = []

		React.Children.map(getChildren(), (child, i) => {
			nodes.push(getNodeProps(child, i))
		})

		setNodes(nodes)
	}, [getChildren, getNodeProps])

	const [visibleSubLists, setVisibleSubLists] = useState<Key[]>([])

	function selectedChildrenCount(childrenKeys: Key[]): number {
		let count = 0

		for (const key of childrenKeys) {
			if (selectedKeys.includes(key)) {
				count++
			}
		}

		return count
	}

	function getItemCheckBoxState(childrenKeys: Key[]): CheckBoxState {
		const count = selectedChildrenCount(childrenKeys)

		if (count === childrenKeys.length) {
			return CheckBoxState.Checked
		}

		if (count > 0) {
			return CheckBoxState.Indeterminate
		}

		return CheckBoxState.Unchecked
	}

	function subOpenHandler(key: Key): void {
		if (visibleSubLists.includes(key)) {
			setVisibleSubLists(visibleSubLists.filter(k => k !== key))
		} else {
			setVisibleSubLists(visibleSubLists.concat(key))
		}
	}

	function isVisible(key: Key): boolean {
		return visibleSubLists.includes(key) && !props.closeAllSubLists
	}

	// TO DO
	// Refactor this function to reduce its Cognitive Complexity from 17 to the 15 allowed
	// eslint-disable-next-line sonarjs/cognitive-complexity
	function treeToReact(
		node: TreeViewNode,
		selectedKeys: Key[],
		depth: number,
	): any {
		depth++

		if (node.root && node.children) {
			return node.children.map((n, index) =>
				<TreeListView key={`tree-view-sub-list-${depth}-${index}`} style={{ padding: 0 }}>
					{treeToReact(n, selectedKeys, depth)}
				</TreeListView>,
			)
		}

		const checkBoxState = getItemCheckBoxState(node.childrenValues)

		if (node.children && node.children.length > 0) {
			return (
				<>
					<ListViewItem
						className={defaultProps.selectionMode === 'multiply' ?
							styles['list-view-item-no-effects'] :
							styles['tree-list-view-item']
						}
						key={node.value}
						selectionMode={props.selectionMode}
						listKey={node.value}
						checkBoxState={checkBoxState}
						selected={defaultProps.selectionMode !== 'multiply' ?
							selectedKeys.includes(node.value) : false
						}
						onClick={getHandlerSelect(
							selectHandler,
							node.childrenValues,
							defaultProps.selectionMode,
							checkBoxState,
							node.value,
						)}
					>
						{node.icon && <Icon type={node.icon}/>}
						{defaultProps.dropdownIconPosition === 'right' ?
							<TextBlock style={{ margin: 0 }}>{node.title}</TextBlock> : null}

						<Button
							className={styles[`chevron-button-${defaultProps.dropdownIconPosition}`]}
							iconLeft={
								<Icon
									className={isVisible(
										`tree-view-sub-open-list-${depth}-${node.value}`,
									) ? styles['rotated-chevron-icon'] : styles['chevron-icon']}
									type={IconType.ChevronDown}
								/>
							}
							onClick={getSubItemsOpenHandler(
								subOpenHandler,
								depth,
								node.value,
							)}
						/>

						{defaultProps.dropdownIconPosition === 'left' ?
							<TextBlock style={{ margin: 0 }}>{node.title}</TextBlock> : null}
					</ListViewItem>

					{node.children.map((n, i) =>
						<TreeListView
							className={isVisible(`tree-view-sub-open-list-${depth}-${node.value}`) ?
								styles['sublist-visible'] : styles['sublist-hidden']
							}
							key={`tree-view-sub-item-${depth}-${i}`}
						>
							{treeToReact(n, selectedKeys, depth)}
						</TreeListView>,
					)}
				</>
			)
		}

		return (
			<ListViewItem
				key={node.value}
				selectionMode={props.selectionMode}
				listKey={node.value}
				className={defaultProps.selectionMode === 'multiply' ?
					styles['list-view-item-no-effects'] :
					styles['tree-list-view-item']
				}
				onClick={getHandlerSelect(
					selectHandler,
					node.childrenValues,
					defaultProps.selectionMode,
					checkBoxState,
					node.value
				)}
				selected={selectedKeys.includes(node.value)}
			>
				{node.icon && <Icon type={node.icon}/>}
				<TextBlock style={{ margin: 0 }}>{node.title}</TextBlock>
			</ListViewItem>
		)

	}

	const rootNode: TreeViewNode = {
		root: true,

		title: '',
		value: '',
		childrenValues: treeNodes.reduce(
			(p, c) => p.concat(c.childrenValues),
			[] as Key[],
		),
		children: treeNodes,
	}

	return (
		<div {...otherProps}>
			{treeToReact(rootNode, selectedKeys, 0)}
		</div>
	)
}

function getHandlerSelect(
	selectHandler: (keys: Key[], checkBoxState?: CheckBoxState) => void,
	childrenValues: Key[],
	selectionMode: 'none' | 'single' | 'multiply',
	checkBoxState?: CheckBoxState,
	rootKey?: Key,
): () => void {
	if (selectionMode === 'none') {
		return () => void 0
	}

	if (selectionMode === 'single') {
		return () => selectHandler([rootKey || ''])
	}

	return () => selectHandler(childrenValues, checkBoxState)
}

function getSubItemsOpenHandler(handler: (key: Key) => void, depth: number, key: Key) {
	return (e: React.MouseEvent<HTMLButtonElement>) => {
		handler(`tree-view-sub-open-list-${depth}-${key}`)

		e.stopPropagation()
	}
}
