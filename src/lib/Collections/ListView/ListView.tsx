import React, {useEffect, useState} from 'react'
import styles from './styles.module.css'
import {CheckBox, CheckBoxState} from "../../BasicInput/CheckBox/CheckBox";

export type SelectionMode = 'none' | 'single' | 'multiply'

interface ListViewItemProps extends React.DetailedHTMLProps<
    React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
    > {
    listKey?: string | number
    disabled?: boolean

    // private listview props
    selected?: boolean
    selectionMode?: SelectionMode
}

export type PublicListViewItemProps = Omit<ListViewItemProps, 'selected' | 'selectionMode'>

export interface ListViewProps extends Omit<
    React.DetailedHTMLProps<
        React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
    >,
    'children'
> {
    children?:
        React.ReactElement<PublicListViewItemProps> |
        React.ReactElement<PublicListViewItemProps>[]

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
    const { children, className, ...otherProps } = props

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
        <div className={`${styles['list-view']} `} {...otherProps}>
            {React.Children.map(getChildren(), (c, i) => {
                let { selected, listKey, onClick, disabled, ...otherProps } = c.props

                const newOnClick: React.MouseEventHandler<HTMLDivElement> = e => {
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
                                if (defaultProps.selectedItems.length > 0) {
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
                );
            })}
        </div>
    )
}

const ListViewItem = (props: ListViewItemProps) => {
    const {
        selectionMode,
        selected,
        disabled,
        className,
        children,
        ...otherProps
    } = props

    function getClassName() {
        let base = 'list-view-item'

        if (selected)
            base += '-selected'

        if (disabled)
            base += '-disabled'

        return base;
    }

    return (
        <div
            className={`${styles[getClassName()]} ${className || ''}`}
            {...otherProps}
        >
            {selectionMode === 'multiply' ? (
                <CheckBox
                    disabled={disabled}
                    value={selected ? CheckBoxState.Checked : CheckBoxState.Unchecked}
                />
            ) : <></>}

            {children}
        </div>
    )
}
