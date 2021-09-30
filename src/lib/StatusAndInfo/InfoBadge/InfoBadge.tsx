import React from 'react'
import styles from './styles.module.css'

interface InfoBadgeProps {
    style?: React.CSSProperties
    className?: string

    type?: 'attention' | 'informational' | 'success' | 'critical' | 'caution'
    value?: string

    children?: React.ReactNode
}

export function InfoBadge(props: InfoBadgeProps) {
    const defaultProps = Object.assign({
        type: 'attention',
        value: '',
        className: ''
    }, props)

    if (defaultProps.children) {
        return (
            <div
                style={defaultProps.style}
                badge-type={defaultProps.type}
                badge-value={defaultProps.value}
                className={`${styles['badge-container']} ${defaultProps.className}`}
            >
                {defaultProps.children}
            </div>
        )
    } else {
        return (
            <div
                style={defaultProps.style}
                badge-type={defaultProps.type}
                badge-value={defaultProps.value}
                className={`${styles['badge-standalone']} ${defaultProps.className}`}
            />
        )
    }
}
