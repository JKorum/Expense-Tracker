import React from 'react'
import { connect } from 'react-redux'

import ExpenseForm from './ExpenseForm'
import { addExpense } from '../actions/expenses'

export class AddExpensePage extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleSubmit(expense) {
		this.props.addExpense(expense)
		this.props.history.push(`/`)
	}

	render() {
		return (
			<div>
				<h1>Add Expense</h1>
				<ExpenseForm 
					buttonName="add expense"
					onSubmit={this.handleSubmit} 
				/>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	addExpense: (expense) => dispatch(addExpense(expense))
})

export default connect(undefined, mapDispatchToProps)(AddExpensePage)