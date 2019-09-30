import React from 'react'
import { shallow } from 'enzyme'
import { Header } from '../../components/Header'

test(`should render Header correctly`, () => {
	const wrapper = shallow(<Header startSignout={() => {}}/>)
	expect(wrapper).toMatchSnapshot()
})

test(`should call startSignout on button click`, () => {
	const spyStartSignout = jest.fn()
	const wrapper = shallow(<Header startSignout={spyStartSignout}/>)
	wrapper.find('button').simulate('click')
	expect(spyStartSignout).toHaveBeenCalled()
})