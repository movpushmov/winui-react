import React, {useEffect, useState} from "react";
import {Button} from "../Button/Button";

interface ToggleButtonProps extends Omit<
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'value'
> {
    disabled?: boolean
    initialValue?: boolean

    value?: boolean

    onToggle?: (value: boolean) => void
}

export function ToggleButton(props: ToggleButtonProps) {
    const { onClick, initialValue, value, ...otherProps } = props
    const [toggled, setIsToggled] = useState(
        value !== undefined ?
            value : Boolean(initialValue)
    )

    useEffect(() => {
        if (props.value !== undefined) {
            setIsToggled(props.value)
        }
    }, [props])

    useEffect(() => {
        if (props.onToggle && value === undefined) {
            props.onToggle(toggled)
        }
    }, [props, toggled, value])

    return (
        <Button
            {...otherProps}
            onClick={(e) => {
                if (onClick) {
                    onClick(e)
                }

                if (value === undefined) {
                    setIsToggled(!toggled)
                }
            }}
            type={toggled ? 'accent' : 'default'}
        />
    )
}
