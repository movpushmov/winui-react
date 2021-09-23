import React from 'react'
import styles from "./styles.module.css";
import getStyles, {TextBlockPropsBase} from "./utils";

interface TextBlockProps extends TextBlockPropsBase{
    type?:
        'caption' | 'body' |
        'body-strong' | 'body-large'
}

export function TextBlock(props: TextBlockProps) {
    const defaultProps: TextBlockProps = Object.assign({
        type: 'body',
        className: ''
    }, props)

    const { className, type, accent, disabled, ...otherProps } = defaultProps

    return (
        <p
            {...otherProps}
            className={`${styles[type || 'body']} ${getStyles(defaultProps)} ${className}`}
        />
    )
}
