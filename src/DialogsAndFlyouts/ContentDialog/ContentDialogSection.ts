import React from 'react'
import { ButtonProps } from '../../BasicInput/Button/Button'

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface DialogSectionProps extends Omit<DivProps, 'children'> {
	type: 'content' | 'actions'
	children?: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[]
}

export const ContentDialogSection = (props: DialogSectionProps): null => null
