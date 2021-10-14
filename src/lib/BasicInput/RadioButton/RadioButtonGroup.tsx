import React, {useState} from "react";
import {RadioButton, RadioButtonProps} from "./RadioButton"

import styles from './styles.module.css'

interface RadioButtonGroupProps extends React.DetailedHTMLProps<
    React.BaseHTMLAttributes<HTMLDivElement>, HTMLDivElement
> {
    children?: React.ReactElement<RadioButtonProps> | React.ReactElement<RadioButtonProps>[]
}

export const RadioButtonGroup = (props: RadioButtonGroupProps) => {
    const [selectedRadio, setSelectedRadio] = useState(-1)
    const { children, className, ...otherProps } = props

    if (!children) {
        return <></>
    }

    function returnGroup(radioButtons: React.ReactElement<RadioButtonProps>[]): React.ReactNode {
        return React.Children.map(radioButtons, (child, index) => {
            const { checked, onChange, ...otherChildProps } = child.props

            if (checked && index !== selectedRadio) {
                setSelectedRadio(index)
            }

            return (
                <RadioButton
                    {...otherChildProps}
                    value={index === selectedRadio}

                    onChange={e => {
                        setSelectedRadio(index)

                        return onChange?.(e)
                    }}
                />
            )
        })
    }

    return (
        <div
            className={`${styles['radio-buttons-group']} ${className || ''}`}
            {...otherProps}
        >
            {Array.isArray(children) ? returnGroup(children) : returnGroup([children])}
        </div>
    )
}
