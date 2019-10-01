import React from 'react'
import moment from 'moment'
import uuid from 'uuid'

import { SingleDatePicker } from 'react-dates'

class ExpenseForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			description: props.expense? props.expense.description : ``,
			note: props.expense? props.expense.note : ``,
			amount: props.expense? props.expense.amount.toString() : ``,
			createdAt: props.expense? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: undefined,
			button: props.buttonName
		}

		this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
		this.handleNoteChange = this.handleNoteChange.bind(this)
		this.handleAmountChange = this.handleAmountChange.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.handleFocusChange = this.handleFocusChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleDescriptionChange(e) {
		const description = e.target.value
		this.setState(() => ({ description }))
	}

	handleNoteChange(e) {
		const note = e.target.value
		this.setState(() => ({ note }))
	}

	handleAmountChange(e) {
		const amount = e.target.value
		if (!amount || /^\d+(\.\d{0,2})?$/.test(amount)) { 
			this.setState(() => ({ amount }))
		}		
	}

	handleDateChange(calendarDate) {
		if (calendarDate) {
			this.setState(() => ({ createdAt: calendarDate }))
		}		
	}

	handleFocusChange({ focused }) {
		this.setState(() => ({ calendarFocused: focused }))
	}

	handleSubmit(e) {
		e.preventDefault()

		if (!this.state.description || !this.state.amount) {
			this.setState(() => ({ error: `Please provide description and amount` }))
		} else {
				this.setState(() => ({ error: undefined }))
				this.props.onSubmit({
					description: this.state.description,
					amount: +this.state.amount,
					createdAt: this.state.createdAt.valueOf(), // returns timestamp from moment obj
					note: this.state.note
				})
		}
	}

	render() {		
		return (				
			<form className="form" onSubmit={this.handleSubmit}>
				{this.state.error && <p className="form__error">{this.state.error}</p>}
				<input 
					type="text" 
					className="text-input"
					placeholder="description" 
					autoFocus 
					value={this.state.description}
					onChange={this.handleDescriptionChange}
				/>

				<input 
					type="text" 
					className="text-input"
					value={this.state.amount}
					onChange={this.handleAmountChange}
					placeholder="amount" 
				/>

				<SingleDatePicker
				  date={this.state.createdAt} 
				  onDateChange={this.handleDateChange}
				  focused={this.state.calendarFocused}
				  onFocusChange={this.handleFocusChange}
				  id={uuid()}
				  numberOfMonths={1}		
				  isOutsideRange={() => false} // make days in a past clickable			  
				/>

				<textarea 
					className="textarea"
					value={this.state.note}
					onChange={this.handleNoteChange}
					placeholder="add a note for your expense"
				>
				</textarea>
				<div>
					<button 
						type="submit"
						className="button"
						disabled={this.props.buttonName === `edit expense` && this.props.expense === undefined}
					>{this.state.button}</button>
				</div>				
			</form>			
		)
	}
}

export default ExpenseForm