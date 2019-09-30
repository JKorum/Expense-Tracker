import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory  } from 'history'

import LoginPage from '../components/LoginPage'
import DashboardPage from '../components/DashboardPage'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import NotFoundPage from '../components/NotFoundPage'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

export const history = createBrowserHistory()

const AppRouter = () => (
	<Router history={history}>
		<div>			
			<Switch>				
				<PublicRoute exact={true} path="/" component={LoginPage} />
				<PrivateRoute exact={true} path="/dashboard" component={DashboardPage} />
				<PrivateRoute exact={true} path="/create" component={AddExpensePage} />
				<PrivateRoute exact={true} path="/edit/:id" component={EditExpensePage} />				
				<Route component={NotFoundPage} />
			</Switch>
		</div>				
	</Router>
)

export default AppRouter