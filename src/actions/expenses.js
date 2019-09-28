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

	return async (dispatch) => {
		const {
			description = ``, 
			note = ``, 
			amount = 0, 
			createdAt = 0
		} = expenseData

		const newExpense = { description, note, amount, createdAt }

		const expenseReference = await database.collection('expenses').add(newExpense)
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
	return async (dispatch) => {
		await database.collection('expenses').doc(id).delete()
		dispatch(deleteExpense(id))
	}
}









const editExpense = (id, updates) => ({
	type: `EDIT_EXPENSE`, 
	id,
	updates
})




//SET_EXPENSES
const setExpenses = (expenses) => ({
	type: 'SET_EXPENSES',
	expenses
}) 

const startSetExpenses = () => {
	return async (dispatch) => {
		const expenses = []

		const querySnapshot = await database.collection('expenses').get()
		
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
	startDeleteExpense
}