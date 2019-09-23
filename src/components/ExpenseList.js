import React from 'react'
import { connect } from 'react-redux'

import getVisibleExpenses from '../selectors/expenses'
import ExpenseListItem from './ExpenseListItem'

//component declaration props expects to be connected to store
export const ExpenseList = ({ expenses }) => (
	<div>
		{
			expenses.length === 0? (
				<p>No expenses</p>
			) : (
				expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
			) 
		}		
	</div>
)

// what store properties connected component should have access to
const mapStateToProps = (state) => ({
	expenses: getVisibleExpenses(state.expenses, state.filters)
})

//connect()() returns connected component 
export default connect(mapStateToProps)(ExpenseList)