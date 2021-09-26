import React, {CSSProperties, useEffect, useState} from "react";
import styles from './styles.module.css'
import {TextBlock} from "../../Text/TextBlock";

interface CheckBoxProps {
    style?: CSSProperties

    className?: string
    content?: string

    isThreeState?: boolean
    disabled?: boolean

    value?: CheckBoxState
    initialValue?: CheckBoxState

    onChanged?: (value: CheckBoxState) => void
}

export enum CheckBoxState {
    Unchecked,
    Checked,
    Indeterminate
}

export function CheckBox(props: CheckBoxProps) {
    const [state, setState] = useState(
        props.value !== undefined ?
            props.value : (props.initialValue || CheckBoxState.Unchecked)
    )

    useEffect(() => {
        if (props.onChanged) {
            props.onChanged(state)
        }
    }, [state, props])

    function onClick() {
        if (props.disabled) {
            return
        }

        if (props.isThreeState) {
            switch (state) {
                case CheckBoxState.Unchecked: {
                    setState(CheckBoxState.Checked)
                    break
                }
                case CheckBoxState.Checked: {
                    setState(CheckBoxState.Indeterminate)
                    break
                }
                case CheckBoxState.Indeterminate: {
                    setState(CheckBoxState.Unchecked)
                }
            }
        } else {
            if (state === CheckBoxState.Unchecked) {
                setState(CheckBoxState.Checked)
            } else {
                setState(CheckBoxState.Unchecked)
            }
        }
    }

    return (
        <div>
            <div
                className={`${styles['container']} ${props.className || ''}`}
                style={props.style}
                onClick={onClick}
            >
                <input
                    className={styles['input']}
                    checkbox-data={state}
                    disabled={props.disabled}
                />
                <span className={styles['checkmark']} />

                {props.content ? <TextBlock>{props.content}</TextBlock> : <></>}
            </div>
        </div>
    )
}
