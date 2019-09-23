import { createStore, combineReducers } from 'redux'
import expensesReduser from '../reducers/expenses'
import filtersReducer from '../reducers/filters'

// STORE CONFIGURATION
export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReduser,
			filters: filtersReducer
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)	
	
	return store 
}


