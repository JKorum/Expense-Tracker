import { login, logout } from '../../actions/auth'

test(`should correctly set up login object`, () => {
	const uid = '123'
	expect(login(uid)).toEqual({
		type: 'LOGIN',
		uid
	})
})

test(`should correctly set up logout object`, () => {
	expect(logout()).toEqual({
		type: 'LOGOUT'
	})
})