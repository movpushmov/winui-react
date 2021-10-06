import React, {useEffect, useState} from 'react'
import styles from './styles.module.css'
import { ProgressProps } from '../types'

interface ProgressBarProps extends ProgressProps {
    state?: 'running' | 'paused' | 'error'
}

export const ProgressBar = (props: ProgressBarProps) => {
    const [percentage, setPercentage] = useState(0)
    const [length, setLength] = useState(0)

    const state = props.state || 'running'

    useEffect(() => {
        if (props.value && props.value > 100) {
            setPercentage(100)
        } else if (props.value && props.value < 0) {
            setPercentage(0)
        } else if (props.value) {
            setPercentage(props.value)
        }
    }, [props.value])

    if (props.determinate) {
        return (
            <div
                className={`${styles['loader']} ${props.className || ''}`}
                style={props.style}
            >
                <div
                    className={styles['determinate-indicator']}
                    style={{ width: percentage + '%' }}
                />
                <div className={styles['determinate-background']}/>
            </div>
        )
    } else if (!props.active) {
        return <></>
    }

    return (
        <div
            className={`${styles['loader']} ${props.className || ''}`}
            style={props.style}
        >
            <div
                className={styles['indicator']}
                data-state={state}
            />
        </div>
    )
}
