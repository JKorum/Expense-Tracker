import React from 'react'
import { connect } from 'react-redux'

import ExpenseForm from './ExpenseForm'
import { startEditExpense, startDeleteExpense } from '../actions/expenses'

export class EditExpensePage extends React.Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleRemoveExpense = this.handleRemoveExpense.bind(this)
	}

	handleSubmit(expense) {		
		this.props.startEditExpense(this.props.expense.id, expense)
		this.props.history.push(`/`)
	}

	handleRemoveExpense(e){		
		this.props.startDeleteExpense(this.props.expense.id)
		this.props.history.push(`/`)
	}

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h3 className="page-header__title">Edit Expense</h3>
					</div>
				</div>
				<div className="content-container">
					<ExpenseForm 
						buttonName="edit expense"
						expense={this.props.expense}
						onSubmit={this.handleSubmit}
					/>
					<button 
						type="button"
						className="button button--secondary" 
						onClick={this.handleRemoveExpense} 
						disabled={!this.props.expense}
					>Remove expense</button>
				</div>				
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	expense: state.expenses.find(expense => expense.id === ownProps.match.params.id)
})

const mapDispatchToProps = (dispatch) => ({
	startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
	startDeleteExpense: id => dispatch(startDeleteExpense(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage)