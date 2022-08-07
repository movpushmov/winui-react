import React, { useState } from 'react'
import { TextBox } from '../../Text/TextBox/TextBox'
import { CalendarView, CalendarViewProps } from '../CalendarView/CalendarView'
import { Flyout } from '../../DialogsAndFlyouts/Flyout/Flyout'

interface CalendarDatePickerProps extends Omit<CalendarViewProps, 'selectedDates' | 'defaultSelectedDates'> {
	defaultDate?: Date
	selectedDate?: Date

	placeholder?: string
}

export const CalendarDatePicker = (props: CalendarDatePickerProps): React.ReactElement => {
	const [selectedDate, setSelectedDate] = useState(props.selectedDate ?? props.defaultDate ?? void 0)
	const [visible, setIsVisible] = useState(false)

	return (
		<div>
			<Flyout
				visible={visible}
				flyoutPosition="bottom"
				flyoutContent={(
					<CalendarView selectionMode="single" locale="ru"/>
				)}

				boxProps={{
					style: {
						background: 'unset',
						padding: 0,
					},
				}}
			>
				<TextBox
					placeholder=""
					value={(selectedDate ?? '').toString()}
					readOnly
					onFocus={() => setIsVisible(true)}
					onBlur={() => setIsVisible(false)}
				/>
			</Flyout>
		</div>
	)
}
