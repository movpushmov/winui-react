import React, {CSSProperties, useEffect, useState} from "react";
import styles from './styles.module.css'
import {TextBlock} from "../../Text/TextBlock";

interface ToggleSwitchProps {
    header?: string
    offContent?: string
    onContent?: string

    style?: CSSProperties
    className?: string

    disabled?: boolean

    initialValue?: boolean
    value?: boolean
    onToggled?: (value: boolean) => void
}

export function ToggleSwitch(props: ToggleSwitchProps) {
    const [toggled, setIsToggled] = useState(
        props.value !== undefined ?
            props.value : Boolean(props.initialValue)
    )

    return (
        <div style={props.style} className={props.className}>
            {props.header ? (
                <TextBlock type="body-strong">{props.header}</TextBlock>
            ) : <></>}

            <div className={styles['row-block']}>
                <label className={styles['switch']}>
                    <input
                        disabled={props.disabled}
                        checked={toggled}
                        onChange={() => {
                            if (props.onToggled) {
                                props.onToggled(!toggled)
                            }

                            if (props.value === undefined) {
                                setIsToggled(!toggled)
                            }
                        }}
                        type="checkbox"
                        className={styles['input']}
                    />
                    <span className={styles['slider']}/>
                </label>

                {props.onContent || props.offContent ? (
                    <TextBlock>{toggled ? props.onContent : props.offContent}</TextBlock>
                ) : <></>}
            </div>
        </div>
    )
}
