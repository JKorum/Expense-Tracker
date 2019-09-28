import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let editExpenseSpy, deleteExpenseSpy, history, expense, wrapper

beforeEach(() => {
	editExpenseSpy = jest.fn()
	deleteExpenseSpy = jest.fn()
	history = { push: jest.fn() }
	expense = expenses[0]	

	const jsx = (
		<EditExpensePage 
			history={history} 
			expense={expense} 
			startEditExpense={editExpenseSpy} 
			startDeleteExpense={deleteExpenseSpy} 
		/>
	)		

	wrapper = shallow(jsx)
})

test(`should render EditExpensePage correctly`, () => {	
	expect(wrapper).toMatchSnapshot()
})

test(`should handle button click correctly`, () => {
	wrapper.find(`button`).simulate(`click`)
	expect(deleteExpenseSpy).toHaveBeenLastCalledWith(expense.id)
	expect(history.push).toHaveBeenLastCalledWith(`/`)
})

test(`should handle onSubmit correctly`, () => {
	wrapper.find(`ExpenseForm`).prop(`onSubmit`)(expense)
	expect(editExpenseSpy).toHaveBeenLastCalledWith(expense.id, expense)
	expect(history.push).toHaveBeenLastCalledWith(`/`)
})