import { auth, googleAuthProvider } from '../firebase/firestore'

const login = (uid) => ({
	type: 'LOGIN',
	uid
})

const startLogin = () => {
	return async () => {
		await auth.signInWithPopup(googleAuthProvider)
	}
}

const logout = () => ({
	type: 'LOGOUT'
})

const startSignout = () => {
	return async () => {
		await auth.signOut()
	}
}

export { login, logout, startLogin, startSignout }