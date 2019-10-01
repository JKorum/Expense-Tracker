import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

import getVisibleExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/selectExpensesTotal'

export const ExpensesSummary = ({ counter, total }) => (
	<div className="page-header">
		<div className="content-container">
			<h3 className="page-header__title">
				{`Viewing ${counter === 1 
					? `one expense` 
					: `${counter} expenses`} totaling ${numeral(total).format(`$0,0.00`)}`}
			</h3>
			<div className="page-header__actions">
				<Link className="button" to="/create">Add expense</Link>
			</div>
		</div>		
	</div>
)

const mapStateToProps = ({ expenses, filters }) => {
	const visibleExpenses = getVisibleExpenses(expenses, filters) 
	return {
		counter: visibleExpenses.length, 
		total: selectExpensesTotal(visibleExpenses) 
	}
}

export default connect(mapStateToProps)(ExpensesSummary)