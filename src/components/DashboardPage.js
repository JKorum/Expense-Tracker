import React from 'react'
import { connect } from 'react-redux'
import ExpenseList from './ExpenseList'
import ExpenseListFilters from './ExpenseListFilters'
import ExpensesSummary from './ExpensesSummary'
import getVisibleExpenses from '../selectors/expenses'

export const DashboardPage = ({ counter }) => (
	<div>
		{ counter > 0 && <ExpensesSummary /> }
		<ExpenseListFilters />
		<ExpenseList />
	</div>
)

const mapStateToProps = ({ expenses, filters }) => ({
	counter: getVisibleExpenses(expenses, filters).length
})

export default connect(mapStateToProps)(DashboardPage)