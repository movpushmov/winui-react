import React, { useCallback, useState } from 'react'
import { Button } from '../lib/BasicInput/Button/Button'
import ContentDialog from '../lib/DialogsAndFlyouts/ContentDialog/ContentDialog'
import { ContentDialogSection } from '../lib/DialogsAndFlyouts/ContentDialog/ContentDialogSection'
import { TextBlock } from '../lib/Text/Text/TextBlock'
import { CheckBox } from '../lib/BasicInput/CheckBox/CheckBox'

const DialogBlock = (): React.ReactElement => {
	const [visible, setIsVisible] = useState(false)

	const handleOpen = useCallback(() => setIsVisible(true), [])
	const handleClose = useCallback(() => setIsVisible(false), [])

	return (
		<div>
			<ContentDialog
				visible={visible}
				title="Save your work?"
			>
				<ContentDialogSection type="content">
					<TextBlock>Lorem ipsum dolor sit amet, adipisicing elit</TextBlock>

					<CheckBox content="Upload your content to the cloud."/>
				</ContentDialogSection>

				<ContentDialogSection type="actions">
					<Button type="accent" onClick={handleClose}>
						Save
					</Button>

					<Button onClick={handleClose}>
						Don&apos;t save
					</Button>

					<Button onClick={handleClose}>
						Cancel
					</Button>
				</ContentDialogSection>
			</ContentDialog>

			<Button onClick={handleOpen}>Show dialog</Button>
		</div>
	)
}

export default DialogBlock
