import uuid from 'uuid'
import database from '../firebase/firestore'

// ACTION GENERATORS 
// action gen --> action object --> arg for store.dispatch

//ADD EXPENSE
const addExpense = (expense) => ({
	type: `ADD_EXPENSE`,
	expense
})

const startAddExpense = (expenseData = {}) => { //functionality is possible because `redux-thunk`
	return async (dispatch, getState) => {
		const {
			description = ``, 
			note = ``, 
			amount = 0, 
			createdAt = 0
		} = expenseData

		const uid = getState().auth.uid

		const newExpense = { description, note, amount, createdAt }

		const expenseReference = await database.collection(`users/${uid}/expenses`).add(newExpense)
		const expenseSnapshot = await expenseReference.get()
		const expenseForRedux = expenseSnapshot.data()

		dispatch(addExpense({
			id: expenseSnapshot.id,
			...expenseForRedux
		}))

	}
}

//DELETE EXPENSE
const deleteExpense = (expenseId) => ({
	type: `DELETE_EXPENSE`,
	expenseId
})

const startDeleteExpense = (id) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid
		await database.collection(`users/${uid}/expenses`).doc(id).delete()
		dispatch(deleteExpense(id))
	}
}

//EDIT EXPENSE
const editExpense = (id, updates) => ({
	type: `EDIT_EXPENSE`, 
	id,
	updates
})

const startEditExpense = (id, updates) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid
		await database.collection(`users/${uid}/expenses`).doc(id).update(updates)
		dispatch(editExpense(id, updates))
	}
}

//SET_EXPENSES
const setExpenses = (expenses) => ({
	type: 'SET_EXPENSES',
	expenses
}) 

const startSetExpenses = () => {
	return async (dispatch, getState) => {
		const expenses = []
		const uid = getState().auth.uid

		const querySnapshot = await database.collection(`users/${uid}/expenses`).get()
		
		if (querySnapshot.empty === false) {
			querySnapshot.forEach(queryDocSnap => {
				expenses.push({
					id: queryDocSnap.id,
					...queryDocSnap.data()
				})
			})
			dispatch(setExpenses(expenses))
		} else {
				dispatch(setExpenses(expenses))
		}

	}
}

export { 
	addExpense, 
	startAddExpense,
	deleteExpense, 
	editExpense, 
	setExpenses, 
	startSetExpenses,
	startDeleteExpense,
	startEditExpense
}