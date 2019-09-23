import moment from 'moment'

// SELECTOR
// expenses (state), filters (state) --> selector --> subset of expenses based on filters 

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {	
	return expenses.filter(expense => {
		const createdAtMoment = moment(expense.createdAt) //timestamp --> moment obj 

		// if startDate === `undefined` --> startDateMatch === true --> will not effect result	
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, `day`) : true
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, `day`) : true
		const textMatch = text === `` || new RegExp(text, `i`).test(expense.description)

		return startDateMatch && endDateMatch && textMatch

	}).sort((a, b) => {
			if (sortBy === `date`) {
				return a.createdAt < b.createdAt ? 1 : -1 
			} else if (sortBy === `amount`) {
				return a.amount < b.amount ? 1 : (a.amount > b.amount? -1 : 0)
			}
	})	
}

export default getVisibleExpenses