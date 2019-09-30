import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'

import { startSetExpenses } from './actions/expenses'
import { auth } from './firebase/firestore'

import { login, logout } from './actions/auth'

import 'react-dates/initialize'
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css'
import './styles/style.scss'

const store = configureStore()

const jsx = (
	<Provider store={store}>
		<AppRouter />		
	</Provider>	
)

ReactDOM.render(<p>Loading...</p>, document.getElementById(`app`))

let hasRendered = false
const renderApp = () => {
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById(`app`))
		hasRendered = true
	}
}

auth.onAuthStateChanged((user) => {
	if (user) {		
		store.dispatch(login(user.uid))
		store.dispatch(startSetExpenses()).then(() => {
			renderApp()			
			if (history.location.pathname === '/') {
				history.push('/dashboard')
			}
		})
	} else {
			store.dispatch(logout())
			renderApp()
			history.push('/')
	}
})