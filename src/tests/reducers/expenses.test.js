import moment from 'moment'
import expensesReduser from '../../reducers/expenses'
import expenses from '../fixtures/expenses'

test(`should set up default state`, () => {
	const state = expensesReduser(undefined, { type: "@@INIT" })
	expect(state).toEqual([])
})

test(`should remove expense by id`, () => {	
	const action = {
		type: `DELETE_EXPENSE`,
		expenseId: expenses[2].id
	}
	const state = expensesReduser(expenses, action)
	expect(state).toEqual([ expenses[0], expenses[1] ])
})

test(`should not remove expense if id is not found`, () => {	
	const action = {
		type: `DELETE_EXPENSE`,
		expenseId: `-1`
	}
	const state = expensesReduser(expenses, action)
	expect(state).toEqual(expenses)
})

test(`should add new expense`, () => {
	const action = {
		type: `ADD_EXPENSE`,
		expense: {
			id: `4`,
			description: `new expense`,
			note: ``,
			amount: `700`,
			createdAt: moment().valueOf()
		}
	}
	const state = expensesReduser(expenses, action)
	expect(state).toEqual([...expenses, action.expense])
})

test(`should edit existing expense`, () => {
	const action = {
		type: `EDIT_EXPENSE`,
		id: expenses[0].id,
		updates: {
			description: `hair tax UPDATED`,
			note: `looks great UPDATED`,
			amount: `100000`
		}
	}
	const state = expensesReduser(expenses, action)
	expect(state[0]).toEqual({ ...expenses[0], ...action.updates })
})

test(`should not edit not existing expense`, () => {
	const action = {
		type: `EDIT_EXPENSE`,
		id: `-1`,
		updates: {
			description: `crow fly high`
		}
	}
	const state = expensesReduser(expenses, action)
	expect(state).toEqual(expenses)
})

test(`should set expenses`, () => {
	let action = {
		type: `ADD_EXPENSE`,
		expense: {
			id: `4`,
			description: `new expense`,
			note: ``,
			amount: `700`,
			createdAt: moment().valueOf()
		}
	}
	const defaultState = expensesReduser([], action)
	action = {
		type: `SET_EXPENSES`,
		expenses
	}
	const state = expensesReduser(defaultState, action)
	expect(state).toEqual([...expenses])
})