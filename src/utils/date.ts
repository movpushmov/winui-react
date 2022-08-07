// const
const firstDay = 1
const offset = 1
const lastDayIndex = 6
const lastMonthIndex = 11
const decade = 10

export interface Decade {
	start: number
	end: number
}

function getDays(month: number, year: number): Date[] {
	const date = new Date(year, month, firstDay)
	const days: Date[] = []

	while (date.getMonth() === month) {
		days.push(new Date(date))
		date.setDate(date.getDate() + offset)
	}

	return days
}

export function getDaysInMonth(month: number, year: number): Date[] {
	let days: Date[] = getDays(month, year)

	{
		const daysInPrevMonth: Date[] = month === 0 ?
			getDays(lastMonthIndex, year - offset) :
			getDays(month - offset, year)

		if (days[0]) {
			days = daysInPrevMonth
				.slice(Math.max(daysInPrevMonth.length - days[0].getDay(), 0))
				.concat(days)
		}
	}

	{
		const daysInNextMonth: Date[] = month === lastMonthIndex ?
			getDays(0, year + offset) :
			getDays(month + offset, year)

		const [firstDay] = days
		const lastDay = days[days.length - offset]

		if (firstDay && lastDayIndex - firstDay.getDay() > 0 && lastDay) {
			days = days.concat(daysInNextMonth.slice(0, lastDayIndex - lastDay.getDay()))
		}
	}

	return days
}

export function getMonths(): Date[] {
	const months: Date[] = []

	for (let i = 0; i <= lastMonthIndex; i++) {
		const date = new Date()
		date.setDate(offset)
		date.setMonth(i)

		months.push(new Date(date))
	}

	return months
}

const round = (n: number, to: number): number => n - n % to

export function getDecade(year: number): Decade {
	const now = new Date(year, 0, firstDay)

	const start = new Date(round(now.getFullYear(), decade), 0, offset)
	// Go to the start of the next period ...
	const end = new Date(round(now.getFullYear(), decade) + decade, 0, offset)
	end.setDate(end.getDate() - offset) // then go one day back

	return {
		start: start.getFullYear(),
		end: end.getFullYear(),
	}
}

export function toString(date: Date, locale: string): string {
	return date.toLocaleString(locale, { day: 'numeric', month: 'numeric', year: 'numeric' })
}

export function isEqual(first: Date, second: Date): boolean {
	return (
		first.getDate() === second.getDate() &&
		first.getMonth() === second.getMonth() &&
		first.getFullYear() === second.getFullYear()
	)
}

export function getInRange(from: Date, to: Date): Date[] {
	const days: Date[] = []

	if (to.getTime() < from.getTime()) {
		const date = new Date(to)
		days.push(new Date(date))

		while (!isEqual(date, from)) {
			date.setDate(date.getDate() + offset)
			days.push(new Date(date))
		}
	} else {
		const date = new Date(from)
		days.push(new Date(date))

		while (!isEqual(date, to)) {
			date.setDate(date.getDate() + offset)
			days.push(new Date(date))
		}
	}

	return days
}
