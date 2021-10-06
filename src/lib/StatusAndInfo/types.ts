import {CSSProperties} from "react";

export interface ProgressProps {
    className?: string
    style?: CSSProperties

    active?: boolean
    indeterminate?: true
    value?: number
}
