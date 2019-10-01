import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
	<div className="box-layout">
		<div className="box-layout__box">
			<h1 className="box-layout__title">Expense tracker</h1>
			<p>Track down your expenses</p>
			<button 
				type="button" 
				className="button" 
				onClick={startLogin}
			>
				Login with Google
			</button>
		</div>		
	</div>
)

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
})

export default connect(undefined, mapDispatchToProps)(LoginPage)