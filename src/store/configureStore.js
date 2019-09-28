import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import expensesReduser from '../reducers/expenses'
import filtersReducer from '../reducers/filters'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// STORE CONFIGURATION
export default () => {
	const store = createStore(
		combineReducers({
			expenses: expensesReduser,
			filters: filtersReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	)	
	
	return store 
}

//the second argument to `createstore` before `thunk` integration was -->
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()