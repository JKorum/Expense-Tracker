// ACTION GENERATORS 
// action gen --> action object --> arg for store.dispatch

const setTextFilter = (text = ``) => ({
	type: `SET_TEXT_FILTER`,
	text
})

const setStartDate = (startDate) => ({
	type: `SET_START_DATE`,
	startDate
})

const setEndDate = (endDate) => ({
	type: `SET_END_DATE`,
	endDate
})

const sortByAmount = () => ({
	type: `SORT_AMOUNT`
})

const sortByDate = () => ({
	type: `SORT_DATE`
})

export { setTextFilter, setStartDate, setEndDate, sortByAmount, sortByDate }