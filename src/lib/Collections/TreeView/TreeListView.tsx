import React, {useEffect, useState} from "react";
import styles from "../ListView/styles.module.css";
import {ListViewItem} from "../ListView/ListViewItem";
import {ListViewItemProps, ListViewProps} from "../ListView/ListView";

export const TreeListView = (props: ListViewProps) => {
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

    return (
        <ul className={`${styles['list-view']} `} {...otherProps}>
            {children}
        </ul>
    )
}
