import React, {CSSProperties, useState} from "react";
import {Button} from "../Button/Button";
import styles from './styles.module.css'
import {Icon, IconType} from "../../Icons/Icon";
import {TextBlock} from "../../Text/TextBlock";

export type DropDownItem = {
    icon?: IconType,
    name: string,
    value?: any
}

interface DropDownButtonProps {
    items?: DropDownItem[]
    emptyMessage?: string

    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onSelect?: (value: any) => void

    className?: string
    style?: CSSProperties

    children?: React.ReactNode
    disabled?: boolean
}

export function DropDownButton(props: DropDownButtonProps) {
    const defaultProps: DropDownButtonProps = Object.assign({
        items: [],
        emptyMessage: 'Nothing to see.',
        className: ''
    }, props)

    const { items, emptyMessage, onSelect, onClick, ...otherProps } = defaultProps

    const [visible, setIsVisible] = useState(false)

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
                iconRight={<Icon type={IconType.ChevronDown} style={{ marginLeft: '16px' }} />}
            />

            <div className={styles['dropdown-menu']}>
                {visible ? (
                    <div className={styles['dropdown-content']}>
                        {props.items && props.items.length ? (
                            props.items.map(i => (
                                <div
                                    className={styles['dropdown-item']}
                                    onClick={() => {
                                        if (props.onSelect) {
                                            props.onSelect(i)
                                        }

                                        setIsVisible(false)
                                    }}
                                >
                                    {i.icon ? <Icon type={i.icon} style={{ marginRight: '8px' }} /> : <></>}

                                    <TextBlock type="body">{i.name}</TextBlock>
                                </div>
                            ))
                        ) : (
                            <TextBlock>
                                <Icon type={IconType.Warning} />

                                {emptyMessage}
                            </TextBlock>
                        )}
                    </div>
                ) : <></>}
            </div>
        </div>
    )
}
