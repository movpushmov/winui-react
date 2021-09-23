import React from "react";
import styles from "./styles.module.css";
import getStyles, {TextBlockPropsBase} from "./utils";

interface TextBlockProps extends TextBlockPropsBase{
    type?:
        'subtitle' | 'title' |
        'title-large' | 'display'
}

export function TitleBlock(props: TextBlockProps) {
    const defaultProps: TextBlockProps = Object.assign({
        type: 'subtitle',
        className: ''
    }, props)

    const { className, type, accent, disabled, ...otherProps } = defaultProps

    switch (type) {
        case 'title':
            return <h3 {...otherProps} className={`${styles['title']} ${getStyles(defaultProps)} ${className}`}/>
        case 'title-large':
            return <h2 {...otherProps} className={`${styles['title-large']} ${getStyles(defaultProps)} ${className}`}/>
        case 'display':
            return <h1 {...otherProps} className={`${styles['display']} ${getStyles(defaultProps)} ${className}`}/>
    }

    // if type is subtitle or undefined
    return <h4 {...otherProps} className={`${styles['subtitle']} ${getStyles(defaultProps)} ${className}`}/>
}
