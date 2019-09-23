import selectExpensesTotal from '../../selectors/selectExpensesTotal'
import expenses from '../fixtures/expenses'

test(`should return zero if input is empty array`, () => {
	expect(selectExpensesTotal([])).toEqual(0)
})

test(`should return amount if input array of single expense`, () => {
	const expectedAmount = expenses[0].amount
	expect(selectExpensesTotal([expenses[0]])).toEqual(expectedAmount)
})

test(`should return total amount in input array of expenses`, () => {
	const expectedTotalAmount = expenses[0].amount + expenses[1].amount + expenses[2].amount
	expect(selectExpensesTotal(expenses)).toEqual(expectedTotalAmount)
})

// in --> [] out --> 0
// in --> [{}] out --> amount
// in --> [{}, {}] out --> sum

/*
const expenses = [{
	id: `1`,
	description: `hair tax`,
	note: `looks great`,
	amount: `100`,
	createdAt: 0 //treated as timestamp
}, {
	id: `2`,
	description: `tea tax`,
	note: ``,
	amount: `300`,
	createdAt: moment(0).subtract(4, `days`).valueOf() //timestamp
}, {
	id: `3`,
	description: `rent`,
	note: ``,
	amount: `200`,
	createdAt: moment(0).add(4, `days`).valueOf()
}]

*/