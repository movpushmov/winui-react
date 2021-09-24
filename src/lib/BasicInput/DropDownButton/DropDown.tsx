import styles from './dropdown.module.css';
import React from "react";
import {Icon, IconType} from "../../Icons/Icon";
import {TextBlock} from "../../Text/TextBlock";
import {DropDownItem} from "./DropDownButton";

interface DropDownProps {
    visible: boolean,
    close: () => void,

    onSelect?: (value: any) => void

    items?: DropDownItem[] | React.ReactElement[]
    emptyMessage: string
}

export function DropDown(props: DropDownProps) {
    return (
        <div className={styles['dropdown-menu']}>
            {props.visible ? (
                <div className={styles['dropdown-content']}>
                    {props.items && props.items.length ? (
                        props.items.map(i => {
                            if (React.isValidElement(i)) {
                                return i
                            }

                            return (
                                <div
                                    className={styles['dropdown-item']}
                                    onClick={() => {
                                        if (props.onSelect) {
                                            props.onSelect(i)
                                        }

                                        props.close()
                                    }}
                                >
                                    {i.icon ? <Icon type={i.icon} style={{ marginRight: '8px' }} /> : <></>}

                                    <TextBlock type="body">{i.name}</TextBlock>
                                </div>
                            )
                        })
                    ) : (
                        <TextBlock>
                            <Icon type={IconType.Warning} />

                            {props.emptyMessage}
                        </TextBlock>
                    )}
                </div>
            ) : <></>}
        </div>
    )
}
