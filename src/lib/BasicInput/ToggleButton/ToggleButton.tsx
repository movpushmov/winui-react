import React, {useEffect, useState} from "react";
import {Button} from "../Button/Button";

interface ToggleButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
    disabled?: boolean
    initialState?: boolean
    onToggle?: (value: boolean) => void
}

export function ToggleButton(props: ToggleButtonProps) {
    const { onClick, ...otherProps } = props
    const [toggled, setIsToggled] = useState(false)

    useEffect(() => {
        if (props.onToggle) {
            props.onToggle(toggled)
        }
    }, [props, toggled])

    return (
        <Button
            {...otherProps}
            onClick={(e) => {
                if (onClick) {
                    onClick(e)
                }

                setIsToggled(!toggled)
            }}
            type={toggled ? 'accent' : 'default'}
        />
    )
}
