import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import firestore from '../../firebase/firestore'
import { 
	startAddExpense, 
	addExpense, 
	deleteExpense, 
	editExpense, 
	setExpenses,
	startSetExpenses,
	startDeleteExpense,
	startEditExpense 
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'

const createMockStore = configureMockStore([thunk])

beforeEach(async () => {
	const querySnapshot = await firestore.collection('expenses').get()
	querySnapshot.forEach(async (queryDocSnap) => await queryDocSnap.ref.delete())

	expenses.forEach(async ({ description, amount, note, createdAt }) => {
		await firestore.collection('expenses').add({ description, amount, note, createdAt })
	})

})

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

test(`should setup set expenses action object with data`, () => {	
	const action = setExpenses(expenses)
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})	
})

test(`should correctly set store if database has expenses`, async () => {
	const store = createMockStore({})
	await store.dispatch(startSetExpenses())
	const actionFromFakeStore = store.getActions()[0]
		
	const setToCompare = []	

	const querySnapshot = await firestore.collection('expenses').get()
	querySnapshot.forEach(queryDocSnap => {
		setToCompare.push({
			id: queryDocSnap.id,
			...queryDocSnap.data()
		})
	})

	expect(actionFromFakeStore).toEqual({
		type: 'SET_EXPENSES',
		expenses: setToCompare
	})
})

test(`should correctly set store if database has no expenses`, async () => {
	const querySnapshot = await firestore.collection('expenses').get()
	querySnapshot.forEach(async (queryDocSnap) => await queryDocSnap.ref.delete())

	const store = createMockStore({})
	await store.dispatch(startSetExpenses())
	const actionFromFakeStore = store.getActions()[0]

	expect(actionFromFakeStore).toEqual({
		type: 'SET_EXPENSES',
		expenses: []
	})
})

test(`should delete expense`, async () => {
	const store = createMockStore({})

	const querySnapshot = await firestore.collection('expenses').get()
	const id = querySnapshot.docs[0].id

	await store.dispatch(startDeleteExpense(id))

	const docSnapshot = await firestore.collection('expenses').doc(id).get()
	expect(docSnapshot.exists).toEqual(false)

	const action = await store.getActions()[0]

	expect(action).toEqual({
		type: 'DELETE_EXPENSE',
		expenseId: id
	})
})

test(`should update expense`, async () => {	
	const store = createMockStore({})

	const querySnapshot = await firestore.collection('expenses').where('description', '==', 'rent').get()
	const id = querySnapshot.docs[0].id
	const docBeforeUpdate = querySnapshot.docs[0].data()

	const updates = { description: 'rent UPDATED' }

	await store.dispatch(startEditExpense(id, updates))

	const querySnapshotUpdated = await firestore.collection('expenses').doc(id).get()

	expect(querySnapshotUpdated.data()).toEqual({ ...docBeforeUpdate, ...updates })

	expect(store.getActions()[0]).toEqual({
		type: 'EDIT_EXPENSE',
		id,
		updates
	})
})