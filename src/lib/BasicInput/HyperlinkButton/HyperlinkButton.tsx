import React, {HTMLAttributes} from "react";
import styles from './hyperlink.module.css'

interface HyperlinkButtonProps extends React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    disabled?: boolean
    children?: React.ReactNode

    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export function HyperlinkButton(props: HyperlinkButtonProps) {
    const { disabled, className, ...otherProps } = props

    return (
        <div
            {...otherProps}
            className={`${styles['link' + (disabled ? '-disabled' : '')]} ${className || ''}`}
        />
    )
}
