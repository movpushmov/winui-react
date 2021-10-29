import {IconType} from '../../Icons/Icon'
import React, {useEffect, useState} from 'react'
import {SelectionMode} from '../ListView/ListView'
import {ListViewItem} from "../ListView/ListViewItem";
import {TreeListView} from "./TreeListView";
import {CheckBoxState} from "../../BasicInput/CheckBox/CheckBox";

type Key = string | number

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

    onValueSelect?: (selectedItems: Key[]) => void;

    defaultSelectedItems?: Key[]
    selectedItems?: Key[]
    selectionMode?: SelectionMode
}

interface TreeViewNode {
    root?: boolean

    icon?: IconType
    title: string

    value: Key
    childrenValues: Key[]

    children?: TreeViewNode[]
}

interface TreeNodeProps {
    selectedKeys: Key[]
    nodes: TreeViewNode[]
    selectionMode: SelectionMode

    select: (values: Key[], checkBoxState?: CheckBoxState) => void;
}

export const TreeView = (props: TreeViewProps) => {
    const [defaultProps, setDefaultProps] = useState(Object.assign({
        selectedItems: [],
        selectionMode: 'single'
    }, props))

    const [selectedKeys, setSelectedKeys] = useState(
        props.selectedItems ??
        props.defaultSelectedItems ??
        defaultProps.selectedItems
    )

    const [treeNodes, setNodes] = useState<TreeViewNode[]>([])

    function handleClick(keys: Key[], checkBoxState?: CheckBoxState) {
        switch (defaultProps.selectionMode) {
            case 'single': {
                setSelectedKeys(keys)
                break;
            }
            case 'multiply': {
                const keysToAdd: Key[] = []
                const keysToFilter: Key[] = []

                if (checkBoxState !== undefined) {
                    switch (checkBoxState) {
                        case CheckBoxState.Unchecked: {
                            keysToAdd.push(...keys)

                            break;
                        }
                        case CheckBoxState.Checked: {
                            keysToFilter.push(...keys)

                            break;
                        }
                        case CheckBoxState.Indeterminate: {
                            for (const key of keys) {
                                if (!selectedKeys.includes(key)) {
                                    keysToAdd.push(key)
                                }
                            }

                            break;
                        }
                    }
                } else {
                    for (const key of keys) {
                        if (!selectedKeys.includes(key)) {
                            keysToAdd.push(key)
                        } else {
                            keysToFilter.push(key)
                        }
                    }
                }

                const newKeys = selectedKeys
                    .concat(keysToAdd)
                    .filter(k => !keysToFilter.includes(k))

                setSelectedKeys(newKeys)

                break;
            }
            case 'none': {
                return;
            }
        }
    }

    function getChildren(): React.ReactElement<PublicTreeNodeProps>[] {
        if (defaultProps.children) {
            return Array.isArray(defaultProps.children) ?
                defaultProps.children : [defaultProps.children]
        } else {
            return []
        }
    }

    function getNodeProps(
        node: React.ReactElement<PublicTreeNodeProps>,
        index: number
    ): TreeViewNode {
        const currentObject: TreeViewNode = {
            title: node.props.title,
            icon: node.props.icon,
            value: node.props.value ?? index,
            childrenValues: [],
        }

        if (Array.isArray(node.props.children)) {
            currentObject.children = React
                .Children
                .map(node.props.children, (c, i) => (
                    getNodeProps(c, i)
                ))

            for (const treeNode of currentObject.children) {
                currentObject.childrenValues = currentObject
                    .childrenValues
                    .concat(treeNode.childrenValues)
            }
        } else if (!Array.isArray(node.props.children) && node.props.children) {
            currentObject.children = [
                getNodeProps(node.props.children, 0)
            ]

            for (const treeNode of currentObject.children) {
                currentObject.childrenValues = currentObject
                    .childrenValues
                    .concat(treeNode.childrenValues)
            }
        } else if (!node.props.children) {
            currentObject.childrenValues = [currentObject.value]
        }

        return currentObject
    }

    useEffect(() => {
        const nodes: TreeViewNode[] = []

        React.Children.map(getChildren(), (child, i) => {
            nodes.push(getNodeProps(child, i))
        })

        setNodes(nodes)

    }, [props.children])

    return (
        <TreeNode
            nodes={treeNodes}
            selectedKeys={selectedKeys}
            select={handleClick}
            selectionMode={defaultProps.selectionMode}
        />
    )
}

const TreeNode = (props: TreeNodeProps) => {
    function selectedChildrenCount(childrenKeys: Key[]): number {
        let count = 0

        for (const key of childrenKeys) {
            if (props.selectedKeys.includes(key)) {
                count++
            }
        }

        return count
    }

    function getItemCheckBoxState(childrenKeys: Key[]): CheckBoxState {
        const count = selectedChildrenCount(childrenKeys)

        if (count === childrenKeys.length) {
            return CheckBoxState.Checked;
        } else if (count > 0) {
            return CheckBoxState.Indeterminate;
        } else {
            return CheckBoxState.Unchecked;
        }
    }

    function treeToReact(
        node: TreeViewNode,
        selectedKeys: Key[],
        depth: number
    ): any {
        depth++

        if (node.root && node.children) {
            return node.children.map(n => (
                <TreeListView key={`tree-view-sub-item-${depth}`}>
                    {treeToReact(n, selectedKeys, depth)}
                </TreeListView>
            ))
        }

        if (node.children && node.children.length > 0) {
             const checkBoxState = getItemCheckBoxState(node.childrenValues)

            return (
                <>
                    <ListViewItem
                        key={node.value}
                        selectionMode={props.selectionMode}
                        listKey={node.value}
                        checkBoxState={checkBoxState}
                        selected={false}
                        onClick={() => props.select(node.childrenValues, checkBoxState)}
                    >
                        {node.title}
                    </ListViewItem>

                    {node.children.map((n, i) => (
                        <TreeListView key={`tree-view-sub-item-${depth}-${i}`}>
                            {treeToReact(n, selectedKeys, depth)}
                        </TreeListView>
                    ))}
                </>
            )
        } else {
            return (
                <ListViewItem
                    key={node.value}
                    selectionMode={props.selectionMode}
                    listKey={node.value}
                    onClick={() => props.select([node.value])}
                    selected={props.selectedKeys.includes(node.value)}
                >
                    {node.title}
                </ListViewItem>
            )
        }
    }

    const rootNode: TreeViewNode = {
        root: true,

        title: '',
        value: '',
        childrenValues: props.nodes.reduce(
            (p, c) => p.concat(c.childrenValues),
            [] as Key[]
        ),
        children: props.nodes
    }

    return <>{treeToReact(rootNode, props.selectedKeys, 0)}</>
}
