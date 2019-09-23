import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

import getVisibleExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/selectExpensesTotal'

export const ExpensesSummary = ({ counter, total }) => (
	<div>
		{<p>{`Viewing ${counter === 1 ? `one expense` : `${counter} expenses`} totaling ${numeral(total).format(`$0,0.00`)}`}</p>}
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