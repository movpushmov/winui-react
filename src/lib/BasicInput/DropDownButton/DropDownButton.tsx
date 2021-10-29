import React, {CSSProperties, useEffect, useState} from "react";
import {Button} from "../Button/Button";
import styles from './styles.module.css'
import {Icon, IconType} from "../../Icons/Icon";
import {DropDown} from "./DropDown";

export type DropDownItem = {
    icon?: IconType,
    name: string,
    value?: any
}

interface DropDownButtonProps {
    items?: DropDownItem[] | React.ReactElement[]
    emptyMessage?: string

    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onSelect?: (value: any) => void

    className?: string
    style?: CSSProperties

    children?: React.ReactNode
    disabled?: boolean
}

export function DropDownButton(props: DropDownButtonProps) {
    const defaultProps = Object.assign({
        items: [],
        emptyMessage: 'Nothing to see.',
        className: ''
    }, props)

    const { items, emptyMessage, onSelect, onClick, ...otherProps } = defaultProps

    const [visible, setIsVisible] = useState(false)
    const [animateIcon, setIsAnimateIcon] = useState(false)

    useEffect(() => {
        setIsAnimateIcon(false)

        if (visible) {
            setIsAnimateIcon(true)
        }
    }, [visible])

    return (
        <div className={`${styles['dropdown']} ${defaultProps.className}`}>
            <Button
                {...otherProps}
                onClick={(e) => {
                    if (onClick) {
                        onClick(e)
                    }

                    setIsVisible(!visible)
                }}
                className={`${styles['dropdown-button']} ${animateIcon ? styles['animate-icon'] : ''}`}
                iconRight={<Icon type={IconType.ChevronDown} style={{ marginLeft: '16px' }} />}
            />

            <DropDown
                visible={visible}
                close={() => setIsVisible(false)}
                emptyMessage={defaultProps.emptyMessage}
                onSelect={onSelect}
                items={items}
            />
        </div>
    )
}
