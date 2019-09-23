import React from 'react'
import { shallow } from 'enzyme'

import { DashboardPage } from '../../components/DashboardPage'

test(`should render DashboardPage correctly with ExpensesSummary`, () => {
	const wrapper = shallow(<DashboardPage counter={1} />)
	expect(wrapper).toMatchSnapshot()
})

test(`should render DashboardPage correctly without ExpensesSummary`, () => {
	const wrapper = shallow(<DashboardPage counter={0} />)
	expect(wrapper).toMatchSnapshot()
})