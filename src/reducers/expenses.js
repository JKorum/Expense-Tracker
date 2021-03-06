// REDUCER
// action, defaultState, prevState(implicit) --> reducer --> newState

const expensesReducerDefaultState = []

const expensesReduser = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case `SET_EXPENSES`: 
			return [...action.expenses]
		case `ADD_EXPENSE`: 
			return [...state, action.expense]
		case `DELETE_EXPENSE`:
			return state.filter(({ id }) => id !== action.expenseId)
		case `EDIT_EXPENSE`: 
			return state.map(expense => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates
					}
				} else {
					return expense
				}
			})
		default: 
			return state
	}
}

export default expensesReduser