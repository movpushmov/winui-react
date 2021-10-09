import React, {useEffect, useState} from 'react'
import styles from './styles.module.css'
import {Tooltip} from "../../StatusAndInfo/Tooltip/Tooltip";

interface SliderProps extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
> {
    tick?: number
    step?: number

    value?: number
    initialValue?: number

    orientation?: 'horizontal' | 'vertical'
}

export const Slider = (props: SliderProps) => {
    const defaultProps = Object.assign({
        min: 0,
        max: 100,

        step: 1,
        orientation: 'horizontal'
    }, props)

    const range = defaultProps.max - defaultProps.min

    const {
        value,
        initialValue,
        className,
        onMouseDown,
        onMouseUp,
        onChange,
        ...otherProps
    } = defaultProps

    const [currentValue, setCurrentValue] = useState(value ?? initialValue ?? 0)
    const [visible, setIsVisible] = useState(true)

    function getPercentage() {
        return ((currentValue - defaultProps.min) * 100) / range
    }

    return (
        <Tooltip
            content={currentValue}
            visible={visible}
            className={styles['tooltip']}
            style={{
                left: getPercentage() + '%',
                transform: `translate(${
                    // center tooltip by center: transform(-88%, -40%) for max value (100%)
                    ((getPercentage() * -80 / 100) + defaultProps.min - 8) + '%'
                }, -40%)`
            }}
        >
            <input
                type="range"
                {...otherProps}
                value={currentValue}
                onMouseDown={e => {
                    setIsVisible(true)

                    onMouseDown?.(e)
                }}

                onMouseUp={e => {

                    onMouseUp?.(e)
                }}

                onChange={e => {
                    if (value === undefined) {
                        setCurrentValue(parseInt(e.currentTarget.value))
                    }

                    onChange?.(e)
                }}
            />
        </Tooltip>
    )
}
