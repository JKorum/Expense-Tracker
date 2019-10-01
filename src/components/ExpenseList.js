import React from 'react'
import { connect } from 'react-redux'

import getVisibleExpenses from '../selectors/expenses'
import ExpenseListItem from './ExpenseListItem'

//component declaration props expects to be connected to store
export const ExpenseList = ({ expenses }) => (
	<div className="content-container">
		<div className="list-header">
			<div className="show-for-mobile">Expenses</div>
			<div className="show-for-desktop">Expense</div>
			<div className="show-for-desktop">Amount</div>
		</div>
		<div className="list-body">
			{
				expenses.length === 0? (
					<div className="list-item list-item__message">
						<span>No expenses</span>
					</div>				
				) : (
					expenses.map(expense => <ExpenseListItem key={expense.id} {...expense} />)
				) 
			}	
		</div>	
	</div>
)

// what store properties connected component should have access to
const mapStateToProps = (state) => ({
	expenses: getVisibleExpenses(state.expenses, state.filters)
})

//connect()() returns connected component 
export default connect(mapStateToProps)(ExpenseList)