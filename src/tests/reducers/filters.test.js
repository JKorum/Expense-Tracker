import moment from 'moment'
import filtersReducer from '../../reducers/filters'

test(`should setup default filter values`, () => {
	const state = filtersReducer(undefined, { type: `@@INIT` })
	expect(state).toEqual({
		text: ``,
		sortBy: `date`, 
		startDate: moment().startOf(`month`),
		endDate: moment().endOf(`month`)
	})
}) 

test(`should set sortBy to amount`, () => {
	const state = filtersReducer(undefined, { type: `SORT_AMOUNT` })
	expect(state.sortBy).toEqual(`amount`)
})

test(`should set sortBy to date`, () => {
	const currentState = {
		text: ``,
		sortBy: `amount`, 
		startDate: undefined,
		endDate: undefined
	}
	const state = filtersReducer(currentState, { type: `SORT_DATE` })
	expect(state.sortBy).toEqual(`date`)
})

test(`should set text filter to provided value`, () => {
	const text = `crow`
	const state = filtersReducer(undefined, { type: `SET_TEXT_FILTER`, text })
	expect(state.text).toEqual(text)
})

test(`should set startDate to provided value`, () => {
	const startDate = 12345
	const state = filtersReducer(undefined, { type: `SET_START_DATE`, startDate })
	expect(state.startDate).toEqual(startDate)
})

test(`should set endDate to provided value`, () => {
	const endDate = 12345
	const state = filtersReducer(undefined, { type: `SET_END_DATE`, endDate })
	expect(state.endDate).toEqual(endDate)
})