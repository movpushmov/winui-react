import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { ProgressProps } from '../types'

interface ProgressRingProps extends ProgressProps {
    size?: 's' | 'm' | 'l'
}

const letterToSize = {
    s : 16,
    m : 32,
    l : 64
}

export const ProgressRing = (props: ProgressRingProps) => {
    const [percentage, setPercentage] = useState(0)
    const [length, setLength] = useState(0)

    const [size, setSize] = useState(letterToSize[props.size || 'm'])

    useEffect(() => {
        setSize(letterToSize[props.size || 'm'])
    }, [props.size])

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
                className={props.className}
                style={Object.assign({
                    width: size,
                    height: size
                }, props.style)}
            >
                <svg
                    viewBox={`${size / 2} ${size / 2} ${size + 8} ${size + 8}`}
                    style={{ transform: 'rotate(-90deg)' }}
                >
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
                        cx={size + 4}
                        cy={size + 4}
                        r={size / 2}
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
        <div
            className={props.className}
            style={Object.assign({
                width: size,
                height: size
            }, props.style)}
        >
            <svg
                className={
                    `${styles['circular-' + (props.size || 'm')]} ${styles['circular']}`
                }
                viewBox={`${size / 2} ${size / 2} ${size + 8} ${size + 8}`}
            >
                <circle
                    cx={size + 4}
                    cy={size + 4}
                    r={size / 2}
                    fill="none"
                    strokeWidth="4"
                    strokeMiterlimit="10"
                />
            </svg>
        </div>
    )
}
