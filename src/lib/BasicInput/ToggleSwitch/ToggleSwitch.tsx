import React, {useState} from "react";
import styles from './styles.module.css'
import {TextBlock} from "../../Text/TextBlock";

interface ToggleSwitchProps extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'value'
> {
    header?: string
    offContent?: string
    onContent?: string

    initialValue?: boolean
    value?: boolean
    onToggled?: (value: boolean) => void
}

export function ToggleSwitch(props: ToggleSwitchProps) {
    const [toggled, setIsToggled] = useState(props.value ?? props.initialValue ?? false)

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
                        onChange={e => {
                            if (props.onToggled) {
                                props.onToggled(!toggled)
                            }

                            if (props.value === undefined) {
                                setIsToggled(!toggled)
                            }

                            return props.onChange?.(e)
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
