import React, {useEffect, useState} from 'react'
import styles from './styles.module.css'
import { ProgressProps } from '../types'

export const ProgressBar = (props: ProgressProps) => {
    const [percentage, setPercentage] = useState(0)
    const [length, setLength] = useState(0)

    useEffect(() => {
        if (props.value && props.value > 100) {
            setPercentage(100)
        } else if (props.value && props.value < 0) {
            setPercentage(0)
        } else if (props.value) {
            setPercentage(props.value)
        }
    }, [props.value])

    if (props.indeterminate) {
        return (
            <div
                className={`${styles['loader']} ${props.className || ''}`}
                style={props.style}
            >
                <svg viewBox="25 25 50 50" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                        ref={(ref) => {
                            if (ref) {
                                setLength(ref.getTotalLength())
                            }
                        }}
                        style={{
                            strokeDasharray: length,
                            strokeDashoffset: (length - (length * (percentage * 0.01))),
                            stroke: 'var(--accent-color)',
                            strokeLinecap: 'round'
                        }}
                        className="path"
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        strokeWidth="4"
                        strokeMiterlimit="10"
                    />
                </svg>
            </div>
        )
    } else if (!props.active) {
        return <></>
    }

    return (
        <div className={styles['loader']}>
            <svg className={styles['circular']} viewBox="25 25 50 50">
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="4"
                        strokeMiterlimit="10"/>
            </svg>
        </div>
    )
}
