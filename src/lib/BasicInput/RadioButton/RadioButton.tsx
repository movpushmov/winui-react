import React, {useEffect, useState} from "react"
import styles from './styles.module.css'
import {TextBlock} from "../../Text/TextBlock";

export interface RadioButtonProps extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'value'
> {
    content?: string

    initialValue?: boolean
    value?: boolean
}

export const RadioButton = (props: RadioButtonProps) => {
    const {
        className,
        content,
        value,
        initialValue,
        onChange,
        ...otherProps
    } = props
    const [currentValue, setValue] = useState(props.value ?? props.initialValue ?? false)

    useEffect(() => {
        if (props.value !== undefined) {
            setValue(props.value)
        }
    }, [props.value])

    return (
        <label className={styles['radio-label']} style={{ cursor: props.disabled ? 'default' : 'pointer' }}>
            <input
                type="radio"
                className={`${styles['radio']} ${className || ''}`}
                {...otherProps}
                checked={currentValue}
                onChange={e => {
                    if (props.value === undefined) {
                        setValue(!currentValue)
                    }

                    return onChange?.(e)
                }}
            />

            <span className={styles['radio-button']}/>

            {content ? <TextBlock>{content}</TextBlock> : <></>}
        </label>
    )
}
