import authReducer from '../../reducers/auth'

test(`should set up default state`, () => {
	const state = authReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual({})
})

test(`should correctly process login type action object`, () => {
	const uid = '123'
	const state = authReducer(undefined, { type: 'LOGIN', uid })
	expect(state).toEqual({	uid })
})

test(`should correctly process login type action object`, () => {
	const state = authReducer({ uid: '123' }, { type: 'LOGOUT' })
	expect(state).toEqual({})
})