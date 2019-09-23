import moment from 'moment'

const expenses = [{
	id: `1`,
	description: `hair tax`,
	note: `looks great`,
	amount: 100,
	createdAt: 0 //treated as timestamp
}, {
	id: `2`,
	description: `tea tax`,
	note: ``,
	amount: 300,
	createdAt: moment(0).subtract(4, `days`).valueOf() //timestamp
}, {
	id: `3`,
	description: `rent`,
	note: ``,
	amount: 200,
	createdAt: moment(0).add(4, `days`).valueOf()
}]

export default expenses