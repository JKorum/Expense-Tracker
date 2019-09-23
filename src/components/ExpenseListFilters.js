import React from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import { 
	setTextFilter, 
	sortByAmount, 
	sortByDate,
	setStartDate, 
	setEndDate 
} from '../actions/filters'

import { DateRangePicker } from 'react-dates'

//component declaration props expects to be connected to store
export class ExpenseListFilters extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			calendarFocused: null
		}

		this.handleCalendarDatesChange = this.handleCalendarDatesChange.bind(this)
		this.handleCalendarFocusChange = this.handleCalendarFocusChange.bind(this)
		this.handleTextChange = this.handleTextChange.bind(this)
		this.handleSortChange = this.handleSortChange.bind(this)
	}

	handleCalendarDatesChange({ startDate, endDate }) {		
		this.props.setStartDate(startDate)
		this.props.setEndDate(endDate)		
	}

	handleCalendarFocusChange(calendarFocused) {
		this.setState(() => ({ calendarFocused }))
	}

	handleTextChange(e) {		
		this.props.setTextFilter(e.target.value)
	}

	handleSortChange(e) {
		e.target.value === `date`? this.props.sortByDate() : this.props.sortByAmount() 
	}

	render() {
		const { filters, dispatch } = this.props

		return (
			<div>
				<input type="text" value={filters.text} onChange={this.handleTextChange} />
				<select value={filters.sortBy} onChange={this.handleSortChange}>
					<option value="date">Date</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
				  startDate={filters.startDate} 
				  startDateId={uuid()} 
				  endDate={filters.endDate} 
				  endDateId={uuid()} 
				  onDatesChange={this.handleCalendarDatesChange}
				  focusedInput={this.state.calendarFocused}
				  onFocusChange={this.handleCalendarFocusChange}
				 	numberOfMonths={1}		
					isOutsideRange={() => false} // make days in a past clickable	
					showClearDates={true}		
				/>
			</div>
		)
	}
}

// what store properties connected component should have access to
const mapStateToProps = (state) => ({
	filters: state.filters
})

const mapDispatchToProps = (dispatch) => ({
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setEndDate: (endDate) => dispatch(setEndDate(endDate)),
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByDate: () => dispatch(sortByDate()),
	sortByAmount: () => dispatch(sortByAmount())
})

//connect()() returns connected component 
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters)
