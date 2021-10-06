import React from 'react'
import {Button} from "../../BasicInput/Button/Button";
import {Icon, IconType} from "../../Icons/Icon";

import styles from './styles.module.css'

interface CloseButtonProps {
    onClick: (e: React.MouseEvent) => void
}

export function InfoBarCloseButton(props: CloseButtonProps) {
    return (
        <Button onClick={props.onClick} className={styles['close-button']}>
            <Icon type={IconType.ChromeClose} />
        </Button>
    )
}
