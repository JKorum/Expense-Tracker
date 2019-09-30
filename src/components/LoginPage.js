import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
	<div>
		<h1>Expense tracker</h1>
		<button 
			type="button"
			onClick={startLogin} 			
		>
			Login
		</button>
	</div>
)

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)