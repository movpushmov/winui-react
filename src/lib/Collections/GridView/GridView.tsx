import React, {useEffect, useState} from 'react'
import { SelectionMode } from '../ListView/ListView'
import styles from './styles.module.css'
import { CheckBox, CheckBoxState } from '../../BasicInput/CheckBox/CheckBox'

interface GridViewItemProps extends React.DetailedHTMLProps<
    React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
    > {
    listKey?: string | number
    disabled?: boolean

    // private listview props
    selected?: boolean
    selectionMode?: SelectionMode
}

export type PublicGridViewItemProps = Omit<GridViewItemProps, 'selected' | 'selectionMode'>

export interface GridViewProps extends Omit<
    React.DetailedHTMLProps<
        React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
        >,
    'children'
    > {
    children?:
        React.ReactElement<PublicGridViewItemProps> |
        React.ReactElement<PublicGridViewItemProps>[]

    onValueSelect?: (selectedItems: (string | number)[]) => void;

    defaultSelectedItems?: (string | number)[]
    selectedItems?: (string | number)[]
    selectionMode?: SelectionMode
}

export const GridView = (props: GridViewProps) => {
    const [defaultProps, setDefaultProps] = useState(Object.assign({
        selectedItems: [],
        selectionMode: 'single'
    }, props))

    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>(
        props.selectedItems ??
        defaultProps.defaultSelectedItems ??
        defaultProps.selectedItems
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
            selectionMode: 'single'
        }, props))

        if (props.selectedItems !== undefined) {
            setSelectedKeys(props.selectedItems)
        }
    }, [props])

    function getChildren(): React.ReactElement<GridViewItemProps>[] {
        if (defaultProps.children) {
            return Array.isArray(defaultProps.children) ?
                defaultProps.children : [defaultProps.children]
        } else {
            return []
        }
    }

    return (
        <div className={`${styles['grid-view']} `} {...otherProps}>
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
                    <GridViewItem
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

const GridViewItem = (props: GridViewItemProps) => {
    const {
        selectionMode,
        selected,
        disabled,
        className,
        children,
        listKey,
        ...otherProps
    } = props

    function getClassName() {
        let base = 'grid-view-item'

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
                    className={styles['check-box']}
                    value={selected ? CheckBoxState.Checked : CheckBoxState.Unchecked}
                />
            ) : <></>}

            {children}
        </div>
    )
}
