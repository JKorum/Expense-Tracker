import React from 'react'
import { shallow } from 'enzyme'

import { ExpensesSummary } from '../../components/ExpensesSummary'

test(`should render ExpensesSummary correctly for singular expense`, () => {
	const props = { counter: 1, total: 34.98 }
	const wrapper = shallow(<ExpensesSummary { ...props } />)
	expect(wrapper).toMatchSnapshot()
})

test(`should render ExpensesSummary correctly for multiple expenses`, () => {
	const props = { counter: 4, total: 340.98 }
	const wrapper = shallow(<ExpensesSummary { ...props } />)
	expect(wrapper).toMatchSnapshot()
})