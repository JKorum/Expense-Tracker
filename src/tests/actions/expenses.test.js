import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import firestore from '../../firebase/firestore'
import { startAddExpense, addExpense, deleteExpense, editExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

test(`should add expense to database and store with provided value`, async () => {
	const store = createMockStore({})
	const expense = {
		description: 'Mouse',
		amount: 12,
		note: 'new mouse',
		createdAt: 10000
	}
	await store.dispatch(startAddExpense(expense))
	const actionFromStore = store.getActions()[0]
	expect(actionFromStore).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			...expense
		}		
	})
	const expenseSnapshot = await firestore.collection('expenses').doc(actionFromStore.expense.id).get()
	const expenseFromFirestore = expenseSnapshot.data()
	expect(expenseFromFirestore).toEqual(expense)
})

test(`should add expense to database and store with default value`, async () => {
	const defaults = {
		description: '', 
		note: '', 
		amount: 0, 
		createdAt: 0
	}

	const store = createMockStore({})
	await store.dispatch(startAddExpense())
	const actionFromStore = store.getActions()[0]

	expect(actionFromStore).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			...defaults
		}		
	})
	
	const expenseSnapshot = await firestore.collection('expenses').doc(actionFromStore.expense.id).get()
	const expenseFromFirestore = expenseSnapshot.data()

	expect(expenseFromFirestore).toEqual(defaults)

})

// test(`should setup new expense action object with default values`, () => {
// 	const defaults = {
// 		description: ``, 
// 		note: ``, 
// 		amount: 0, 
// 		createdAt: 0
// 	}
// 	const newActObj = addExpense()
// 	expect(newActObj).toEqual({
// 		type: `ADD_EXPENSE`,
// 		expense: {
// 			...defaults,
// 			id: expect.any(String)
// 		}
// 	})
// })



// test(`should setup new expense action object with provided values`, () => {
// 	const action = addExpense(expenses[0])
// 	expect(action).toEqual({
// 		type: `ADD_EXPENSE`,
// 		expense: {
// 			...expenses[0]
// 		}
// 	})
// })


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

