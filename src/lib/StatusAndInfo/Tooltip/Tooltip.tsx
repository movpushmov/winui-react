import React, {CSSProperties, useEffect, useState} from 'react'
import styles from './styles.module.css'
import {TextBlock} from "../../Text/TextBlock";

interface TooltipProps {
    visible?: boolean

    showTime?: number

    style?: CSSProperties
    className?: string

    content: React.ReactNode | string
    children: React.ReactNode
}

export function Tooltip(props: TooltipProps) {
    const showTime = props.showTime !== undefined?
        props.showTime : 1

    const [show, setShow] = useState(Boolean(props.visible))
    const [time, setTime] = useState(0)
    const [timeInterval, setTimeInterval] = useState<number>()

    useEffect(() => {
        if (props.visible !== undefined) {
            setShow(props.visible)
        }
    }, [props.visible])

    useEffect(() => {
        if (time === 0) {
            return
        }

        if (time >= showTime) {
            setShow(true)
            setTime(0)
        }

        setTimeInterval(
            setTimeout(
                () => setTime(time + 1),
                1000
            ) as unknown as number
        )
    }, [time, showTime])

    return (
        <div className={styles['tooltip-container']}>
            <div
                style={props.style}
                className={`${props.className || ''} ${styles['tooltip-box']} ${
                    show ? styles['visible'] : styles['hide']
                }`}
            >
                {typeof props.content === 'string' ? (
                    <TextBlock style={{ margin: 0 }}>{props.content}</TextBlock>
                ) : props.content}
            </div>
            <div
                onMouseEnter={() => {
                    if (props.visible === undefined) {
                        if (!show) {
                            setTimeInterval(
                                setTimeout(
                                    () => setTime(time + 1),
                                    1000
                                ) as unknown as number
                            )
                        }
                    }
                }}
                onMouseLeave={() => {
                    if (props.visible === undefined) {
                        if (timeInterval) {
                            clearTimeout(timeInterval)
                            setTimeInterval(void 0)
                        }

                        setShow(false)
                        setTime(0)
                    }
                }}
            >
                {props.children}
            </div>
        </div>
    )
}
