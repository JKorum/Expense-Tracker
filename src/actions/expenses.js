import uuid from 'uuid'

// ACTION GENERATORS 
// action gen --> action object --> arg for store.dispatch

const addExpense= (
	{
		description = ``, 
		note = ``, 
		amount = 0, 
		createdAt = 0
	} = {}
) => ({
	type: `ADD_EXPENSE`,
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt
	}
})

const deleteExpense = (expenseId) => ({
	type: `DELETE_EXPENSE`,
	expenseId
})

const editExpense = (id, updates) => ({
	type: `EDIT_EXPENSE`, 
	id,
	updates
})

export { addExpense, deleteExpense, editExpense }