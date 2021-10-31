import React, { useCallback, useState } from 'react'
import { TitleBlock } from '../lib/Text/TitleBlock'
import { Flyout } from '../lib/DialogsAndFlyouts/Flyout/Flyout'
import { Button } from '../lib/BasicInput/Button/Button'
import { TextBlock } from '../lib/Text/TextBlock'

export const FlyoutBlock = (): React.ReactElement => {
	const [visible, setIsVisible] = useState(false)

	const handleClose = useCallback(() => setIsVisible(false), [])
	const handleToggleVisibility = useCallback(() => setIsVisible(v => !v), [])

	return (
		<>
			<TitleBlock type="title">Flyout</TitleBlock>

			<Flyout
				flyoutContent={(
					<div>
						<TextBlock type="body-strong" style={{ marginTop: '0', marginBottom: '12px' }}>
                            All items will be removed. Do you want to continue?
						</TextBlock>
						<Button onClick={handleClose}>
                            Yes, empty my cart
						</Button>
					</div>
				)}
				boxProps={{
					style: { width: 340 },
				}}
				visible={visible}
				onClose={handleClose}

				flyoutPosition="bottom"

				style={{ alignSelf: 'center' }}
			>
				<Button onClick={handleToggleVisibility}>
                    Empty cart
				</Button>
			</Flyout>
		</>
	)
}
