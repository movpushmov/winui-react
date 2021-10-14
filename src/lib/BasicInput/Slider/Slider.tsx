import React, {useEffect, useState} from 'react'
import styles from './styles.module.css'
import {Tooltip} from "../../StatusAndInfo/Tooltip/Tooltip";
import {TextBlock} from "../../Text/TextBlock";

interface SliderProps extends Omit<
    React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
> {
    step?: number

    value?: number
    initialValue?: number

    header?: string
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
        style,
        onMouseDown,
        onMouseUp,
        onChange,
        ...otherProps
    } = defaultProps

    const [currentValue, setCurrentValue] = useState(value ?? initialValue ?? 0)
    const [visible, setIsVisible] = useState(false)

    function getPercentage() {
        return ((currentValue - defaultProps.min) * 100) / range
    }

    function getGradient() {
        return `linear-gradient(to right, ${
            defaultProps.disabled ? 'var(--slider-disabled-thumb-color)' : 'var(--accent-color)'
        } ${getPercentage()}%, var(--fill-color-control-strong-default) ${getPercentage()}%)`
    }

    return (
        <>
            {defaultProps.header ? <TextBlock>{defaultProps.header}</TextBlock> : <></>}

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
                <div
                    className={`${styles['slider']} ${className || ''}`}
                    style={style}
                >
                    <input
                        style={{
                            background: getGradient()
                        }}
                        type="range"
                        {...otherProps}
                        value={currentValue}
                        onMouseDown={e => {
                            setIsVisible(true)

                            onMouseDown?.(e)
                        }}

                        onMouseUp={e => {
                            setIsVisible(false)

                            onMouseUp?.(e)
                        }}

                        onChange={e => {
                            if (value === undefined) {
                                setCurrentValue(parseInt(e.currentTarget.value))
                            }

                            onChange?.(e)
                        }}
                    />
                </div>
            </Tooltip>
        </>
    )
}
