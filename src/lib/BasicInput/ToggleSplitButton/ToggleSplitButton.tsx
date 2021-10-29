import React, {useEffect, useState} from "react";
import styles from '../SplitButton/styles.module.css'
import {Icon, IconType} from "../../Icons/Icon";
import {DropDown} from "../DropDownButton/DropDown";
import {ToggleButton} from "../ToggleButton/ToggleButton";
import {SplitButtonProps} from "../SplitButton/SplitButton";

interface DropDownButtonProps extends SplitButtonProps {
    initialValue?: boolean
    value?: boolean

    onToggle?: (value: boolean) => void
}

export function ToggleSplitButton(props: DropDownButtonProps) {
    const defaultProps = Object.assign({
        items: [],
        emptyMessage: 'Nothing to see.',
        className: ''
    }, props)

    const {
        items,
        emptyMessage,
        onSelect,
        onClick,
        value,
        initialValue,
        className,
        children,
        disabled,
        ...otherProps
    } = defaultProps

    const [toggled, setIsToggled] = useState(value !== undefined ?
        value : Boolean(initialValue)
    )
    const [visible, setIsVisible] = useState(false)
    const [animateIcon, setIsAnimateIcon] = useState(false)

    useEffect(() => {
        setIsAnimateIcon(false)

        if (visible) {
            setIsAnimateIcon(true)
        }
    }, [visible])

    useEffect(() => {
        if (!props.disabled && props.onToggle) {
            props.onToggle(toggled)
        }
    },[toggled, props])

    return (
        <div className={`${styles['dropdown']} ${defaultProps.className || ''}`}>
            <div className={`${styles['buttons-row']} ${className || ''}`} {...otherProps}>
                <ToggleButton
                    value={toggled}
                    disabled={disabled}
                    onClick={(e) => {
                        if (onClick) {
                            onClick(e)
                        }

                        if (value === undefined) {
                            setIsToggled(!toggled)
                        }
                    }}
                    className={`${styles['content-button']}`}
                    style={{ borderRight: 'none' }}
                    children={children}
                />

                <ToggleButton
                    value={toggled}
                    disabled={disabled}
                    className={`${styles['dropdown-button']} ${animateIcon ? styles['animate-icon'] : ''}`}
                    onClick={() => setIsVisible(!visible)}

                    style={{
                        padding: 0,
                    }}
                >
                    <div style={{
                            width: 1,
                            height: '100%',
                            backgroundColor: toggled ?
                                'var(--control-stroke-on-accent-tertiary)' :
                                'var(--control-stroke-default)'
                        }}
                    />
                    <Icon type={IconType.ChevronDown} style={{ padding: '4px 8px' }} />
                </ToggleButton>
            </div>

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
