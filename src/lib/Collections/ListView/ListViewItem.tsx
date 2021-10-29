import {ListViewItemProps} from './ListView'
import styles from "./styles.module.css";
import {CheckBox, CheckBoxState} from "../../BasicInput/CheckBox/CheckBox";
import React from "react";

export const ListViewItem = (props: ListViewItemProps) => {
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
        <li
            className={`${styles[getClassName()]} ${className || ''}`}
            {...otherProps}
        >
            {selectionMode === 'multiply' ? (
                <CheckBox
                    disabled={disabled}
                    value={
                        props.checkBoxState ??
                        (selected ? CheckBoxState.Checked : CheckBoxState.Unchecked)
                    }
                />
            ) : <></>}

            {children}
        </li>
    )
}
