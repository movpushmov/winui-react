import React from 'react'
import { ButtonProps } from '../../BasicInput/Button/Button'

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface DialogSectionProps extends Omit<DivProps, 'children'> {
	type: 'content' | 'actions'
	children?: ButtonProps | ButtonProps[]
}

export const ContentDialogSection = (props: DialogSectionProps): null => null
