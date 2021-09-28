import React, { CSSProperties } from 'react'

interface InfoBarProps {
    className?: string
    style?: CSSProperties

    open?: boolean
    closable?: boolean
    iconVisible?: boolean

    title?: string
    message?: string

    onClick?: (e: React.MouseEvent) => void
    severity?: 'informational' | 'success' | 'warning' | 'error'
}

export function InfoBar(props: InfoBarProps) {
    const defaultProps = Object.assign({
        severity: 'informational'
    }, props)

    return (
        <></>
    )
}
