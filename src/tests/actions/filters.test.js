import moment from 'moment'

import { 
	setTextFilter, 
	setStartDate, 
	setEndDate, 
	sortByAmount, 
	sortByDate 
} from '../../actions/filters'

test(`should generate set start date action object`, () => {
	const action = setStartDate(moment(0))
	expect(action).toEqual({
		type: `SET_START_DATE`,
		startDate: moment(0)
	})
})

test(`should generate set end date action object`, () => {
	const action = setEndDate(moment(0))
	expect(action).toEqual({
		type: `SET_END_DATE`,
		endDate: moment(0)
	})
})

test(`should generate sort by amount action object`, () => {
	const action = sortByAmount()
	expect(action).toEqual({
		type: `SORT_AMOUNT`
	})
})

test(`should generate sort by date action object`, () => {
	const action = sortByDate()
	expect(action).toEqual({
		type: `SORT_DATE`
	})
})

test(`should generate set text filter action object with provided value`, () => {
	const argument = `rent and crow`
	const action = setTextFilter(argument)
	expect(action).toEqual({
		type: `SET_TEXT_FILTER`,
		text: argument
	})
})

test(`should generate set text filter action object with default value`, () => {
	const action = setTextFilter()
	expect(action).toEqual({
		type: `SET_TEXT_FILTER`,
		text: ``
	})
})