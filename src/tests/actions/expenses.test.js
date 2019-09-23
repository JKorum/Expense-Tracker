import { addExpense, deleteExpense, editExpense } from '../../actions/expenses'

test(`should setup delete expense action object`, () => {
	const delActObj = deleteExpense(`12345`)
	expect(delActObj).toEqual({
		type: `DELETE_EXPENSE`,
		expenseId: `12345`
	})
})

test(`should setup update expense action object`, () => {
	const updateActObj = editExpense(`12345`, { description: `rent`, amount: `1200` })
	expect(updateActObj).toEqual({
		type: `EDIT_EXPENSE`,
		id: `12345`,
		updates: { description: `rent`, amount: `1200` }
	})
})

test(`should setup new expense action object with provided values`, () => {
	const argument = {
		description: `haircut`,
		note: `looks great`,
		amount: `1`,
		createdAt: 12345
	}
	const newActObj = addExpense(argument)
	expect(newActObj).toEqual({
		type: `ADD_EXPENSE`,
		expense: {
			...argument,
			id: expect.any(String)
		}
	})
})

test(`should setup new expense action object with default values`, () => {
	const defaults = {
		description: ``, 
		note: ``, 
		amount: 0, 
		createdAt: 0
	}
	const newActObj = addExpense()
	expect(newActObj).toEqual({
		type: `ADD_EXPENSE`,
		expense: {
			...defaults,
			id: expect.any(String)
		}
	})
})