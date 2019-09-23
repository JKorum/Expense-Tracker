import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'

import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test(`should render ExpenseForm correctly`, () => {
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	expect(wrapper).toMatchSnapshot()
})

test(`should render ExpenseForm with provided data`, () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} buttonName="testing" />)
	expect(wrapper).toMatchSnapshot()
})

test(`should render error for invalid form submission`, () => {
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	expect(wrapper).toMatchSnapshot(`before form submission`)
	wrapper.find(`form`).simulate(`submit`, {
		preventDefault: () => {}
	})
	expect(wrapper.state(`error`).length).toBeGreaterThan(0)
	expect(wrapper).toMatchSnapshot(`after form submission`)
})

test(`should set description on input change`, () => {
	const value = `Testing description`
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	wrapper.find(`input`).at(0).simulate(`change`, {
		target: { value }
	})
	expect(wrapper.state(`description`)).toEqual(value)
})

test(`should set note on textarea change`, () => {
	const value = `Testing note`
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	wrapper.find(`textarea`).simulate(`change`, {
		target: { value }
	})
	expect(wrapper.state(`note`)).toEqual(value)
})

test(`should set amount on input change with valid data`, () => {
	const value = `35.11`
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	wrapper.find(`input`).at(1).simulate(`change`, {
		target: { value }
	})
	expect(wrapper.state(`amount`)).toEqual(value)
})

test(`should not set amount on input change with invalid data`, () => {
	const value = `35.114535`
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	wrapper.find(`input`).at(1).simulate(`change`, {
		target: { value }
	})
	expect(wrapper.state(`amount`)).toEqual(``)
})

test(`should call onSubmit prop for valid form submission`, () => {
	const onSubmitSpy = jest.fn()
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} buttonName="testing" />)
	wrapper.find(`form`).simulate(`submit`, {
		preventDefault: () => {}
	})
	expect(wrapper.state(`error`)).toEqual(undefined)
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: +expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	})
})

test(`should set createdAt on date change`, () => {
	const now = moment()
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	wrapper.find(`withStyles(SingleDatePicker)`).prop(`onDateChange`)(now)
	expect(wrapper.state(`createdAt`)).toEqual(now)
})

test(`should set calendarFocused on focus change`, () => {	
	const wrapper = shallow(<ExpenseForm buttonName="testing" />)
	wrapper.find(`withStyles(SingleDatePicker)`).prop(`onFocusChange`)({ focused: true })
	expect(wrapper.state(`calendarFocused`)).toEqual(true)
})