import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
	setTextFilter = jest.fn()
	sortByDate = jest.fn()
	sortByAmount = jest.fn()
	setStartDate = jest.fn()
	setEndDate = jest.fn()
	wrapper = shallow(
		<ExpenseListFilters 
			setStartDate={setStartDate}
			setEndDate={setEndDate}
			setTextFilter={setTextFilter}
			sortByDate={sortByDate}
			sortByAmount={sortByAmount}
			filters={filters}
		/>
	)
})

test(`should render ExpenseListFilters correctly`, () => {
	expect(wrapper).toMatchSnapshot()
})

test(`should render ExpenseListFilters with alt data correctly`, () => {
	wrapper.setProps({
		filters: altFilters
	})
	expect(wrapper).toMatchSnapshot()
})

test(`should handle calendar dates change`, () => {
	const input = { startDate: 0, endDate: 1 }
	wrapper.find(`withStyles(DateRangePicker)`).prop(`onDatesChange`)(input)
	expect(setStartDate).toHaveBeenLastCalledWith(input.startDate)
	expect(setEndDate).toHaveBeenLastCalledWith(input.endDate)
})

test(`should handle calendar focus change`, () => {
	const input = `startDate`
	wrapper.find(`withStyles(DateRangePicker)`).prop(`onFocusChange`)(input)
	expect(wrapper.state(`calendarFocused`)).toEqual(input)
})

test(`should  handle text input change`, () => {
	const value = `lilu`
	wrapper.find(`input`).simulate(`change`, { target: { value } })
	expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test(`should handle select sort change to date`, () => {
	const value = `date`
	wrapper.setProps({
		filters: altFilters
	})
	wrapper.find(`select`).simulate(`change`, { target: { value } })
	expect(sortByDate).toHaveBeenCalled()
})

test(`should handle select sort change to amount`, () => {
	const value = `amount`
	wrapper.find(`select`).simulate(`change`, { target: { value } })
	expect(sortByAmount).toHaveBeenCalled()
})


/*

const filters = {
	text: ``,
	sortBy: `date`, 
	startDate: undefined,
	endDate: undefined
}

const altFilters = {
	text: `bills`,
	sortBy: `amount`, 
	startDate: moment(0),
	endDate: moment(0).add(3, `days`)
}

*/