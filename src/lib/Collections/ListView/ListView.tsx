import React, {Children, useEffect, useState} from 'react'
import styles from './styles.module.css'
import {CheckBox, CheckBoxState} from "../../BasicInput/CheckBox/CheckBox";
import {ListViewItem} from "./ListViewItem";

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

    onValueSelect?: (selectedItems: (string | number)[]) => void;

    defaultSelectedItems?: (string | number)[]
    selectedItems?: (string | number)[]
    selectionMode?: SelectionMode
}

export const ListView = (props: ListViewProps) => {
    const [defaultProps, setDefaultProps] = useState(Object.assign({
        selectedItems: [],
        selectionMode: 'single'
    }, props))

    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(
        props.selectedItems ??
        defaultProps.defaultSelectedItems ??
        defaultProps.selectedItems
    )
    const { children, className, onValueSelect, ...otherProps } = props

    useEffect(() => {
        onValueSelect?.(selectedKeys)
    }, [selectedKeys])

    useEffect(() => {
        setDefaultProps(Object.assign({
            selectedItems: [],
            selectionMode: 'single'
        }, props))

        if (props.selectedItems !== undefined) {
            setSelectedKeys(props.selectedItems)
        }
    }, [props])

    function getChildren(): React.ReactElement<ListViewItemProps>[] {
        if (defaultProps.children) {
            return Array.isArray(defaultProps.children) ?
                defaultProps.children : [defaultProps.children]
        } else {
            return []
        }
    }

    return (
        <ul className={`${styles['list-view']} `} {...otherProps}>
            {React.Children.map(getChildren(), (c, i) => {
                let {
                    selected,
                    listKey,
                    onClick,
                    disabled,
                    ...otherProps
                } = c.props

                const newOnClick: React.MouseEventHandler<HTMLLIElement> = e => {
                    onClick?.(e)

                    if (
                        (selectedKeys.includes(listKey ?? i) && defaultProps.selectionMode === 'single') ||
                        disabled
                    ) {
                        return;
                    } else {
                        switch (defaultProps.selectionMode) {
                            case 'none': {
                                return;
                            }
                            case 'single': {
                                if (defaultProps.selectedItems.length > 0 || props.selectedItems !== undefined) {
                                    return;
                                }

                                setSelectedKeys([listKey ?? i])
                                break;
                            }
                            case 'multiply': {
                                if (selectedKeys.includes(listKey ?? i)) {
                                    setSelectedKeys(
                                        selectedKeys.filter(k => k !== (listKey ?? i))
                                    )
                                } else {
                                    setSelectedKeys(selectedKeys.concat(listKey ?? i))
                                }

                                break;
                            }
                        }
                    }
                }

                return (
                    <ListViewItem
                        selected={selected || selectedKeys.includes(listKey ?? i)}
                        listKey={listKey}
                        disabled={disabled}
                        onClick={newOnClick}
                        selectionMode={props.selectionMode}
                        {...otherProps}
                    />
                )
            })}
        </ul>
    )
}

