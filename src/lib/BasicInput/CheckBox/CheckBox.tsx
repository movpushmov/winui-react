import React, {CSSProperties, useEffect, useState} from "react";
import styles from './styles.module.css'
import {TextBlock} from "../../Text/TextBlock";

interface CheckBoxProps extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'value'
>  {
    content?: string

    isThreeState?: boolean

    value?: CheckBoxState
    initialValue?: CheckBoxState
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
        if (props.value !== undefined) {
            setState(props.value)
        }
    }, [props])

    function onClick() {
        if (props.disabled || props.value !== undefined) {
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
                    onChange={e => props.onChange?.(e)}
                />
                <span className={styles['checkmark']} />

                {props.content ? <TextBlock>{props.content}</TextBlock> : <></>}
            </div>
        </div>
    )
}
