import React from 'react'
import { connect } from 'react-redux'

import ExpenseForm from './ExpenseForm'
import { editExpense, deleteExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleRemoveExpense = this.handleRemoveExpense.bind(this)
	}

	handleSubmit(expense) {		
		this.props.editExpense(this.props.expense.id, expense)
		this.props.history.push(`/`)
	}

	handleRemoveExpense(e){		
		this.props.deleteExpense(this.props.expense.id)
		this.props.history.push(`/`)
	}

	render() {
		return (
			<div>
				<h1>Edit Expense</h1>
				<ExpenseForm 
					buttonName="edit expense"
					expense={this.props.expense}
					onSubmit={this.handleSubmit}
				/>
				<button 
					type="button" 
					onClick={this.handleRemoveExpense} 
					disabled={!this.props.expense}
				>Remove</button>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	expense: state.expenses.find(expense => expense.id === ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
	editExpense: (id, expense) => dispatch(editExpense(id, expense)),
	deleteExpense: id => dispatch(deleteExpense(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)