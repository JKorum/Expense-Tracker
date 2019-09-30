import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { startSignout } from '../actions/auth'

export const Header = ({ startSignout }) => (
	<div>
		<h1>Expense tracker</h1>		
		<NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
		<NavLink to="/create" activeClassName="is-active">Create expense</NavLink>				
		<button onClick={startSignout}>Logout</button>		
	</div>
)

const mapDispatchToProps = (dispatch) => ({
	startSignout: () => dispatch(startSignout())
})

export default connect(undefined, mapDispatchToProps)(Header)