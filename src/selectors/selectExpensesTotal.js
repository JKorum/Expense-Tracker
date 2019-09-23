export default (visibleExpenses) => {
	if (visibleExpenses.length === 0) {
		return 0
	} else if (visibleExpenses.length === 1) {
			return visibleExpenses[0].amount
	} else {			
			return visibleExpenses.reduce((accumulator, current) => {
				return accumulator + current.amount
			}, 0)
	}
}