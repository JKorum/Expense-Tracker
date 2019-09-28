import uuid from 'uuid'
import database from '../firebase/firestore'

// ACTION GENERATORS 
// action gen --> action object --> arg for store.dispatch

const addExpense = (expense) => ({
	type: `ADD_EXPENSE`,
	expense
})

//functionality provided by `redux-thunk`
const startAddExpense = (expenseData = {}) => {

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



const deleteExpense = (expenseId) => ({
	type: `DELETE_EXPENSE`,
	expenseId
})

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
	startSetExpenses 
}