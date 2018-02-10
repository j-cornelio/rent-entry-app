const RENTAMOUNT = 1550;
// localStorage.rents==='null'
var inital = !!localStorage.rents ? JSON.parse(localStorage.rents) : [];

const 
	getProperties 	= (amount) => (
		Object.keys(amount)
			.filter( el => el==='payment1' || el==='payment2' || el==='payment3')
	),

	addAllPayments 	= (payments, action) => ( 
		payments
			.map(prop => Number(action.amount[prop]))
			.reduce( (total, pay) => total + pay)
	),

	amountOwed 			= (month) => RENTAMOUNT - month,
	getLastElem 		= (arr) => arr[arr.length - 1],
	totalOwed 			= (amount) => (!!amount && !!amount.owed) ? amount.owed : 0;

export const rentReducer = (state=inital, action={}) => {
	switch(action.type){
		case 'ADD_RENT':

			const 
				payments 		= getProperties(action.amount),
				monthTotal 	= addAllPayments(payments, action),
				total 			= amountOwed(monthTotal),
				current 		= getLastElem(state),
				//when first loads not true. check obj n prop. get later value that's owed
				owing 			= totalOwed(current),

				newData 		= [
					...state,
					{
						month 	 		: action.amount.month,
						payment1 		: action.amount.payment1,
						date1 	 		: action.amount.date1,
						payment2 		: action.amount.payment2,
						date2 	 		: action.amount.date2,
						payment3 		: action.amount.payment3,
						date3 	 		: action.amount.date3,
						id 		 	 		: action.id,
						owed	   		: owing + total,
						monthTotal    
					}
				];

			localStorage.rents = JSON.stringify(newData);
			
			return newData;

		case 'FETCH_AMOUNT_SUCCESS':
			return action.amount

		case 'EDIT_RENT':
				let 
					updatedData = null,
					selected 		= state[action.index].payment1,
					increaseAll = Number(selected) - action.amount;

				if(action.month){
					updatedData =  state.map( (el, idx) => {
						if( idx === action.index ){
							return {
								...el,
								month: action.month
							}
						}
						return el; // return item unchanged
					})
				}

				if(action.date){
					updatedData =  state.map( (el, idx) => {
						if( idx === action.index ){
							return {
								...el,
								date1: action.date
							}
						}
						return el; 
					})
				}

				if(action.amount){
					updatedData =  state.map( (el, idx, array) => {

						if( idx === action.index ){
							const difference = amountOwed(action.amount) - amountOwed(el.monthTotal);
							return { 
								...el,
								monthTotal	: action.amount,
								payment1 		: action.amount,
								owed 				: el.owed + difference
							}
						}
						if( idx > action.index ){
							return { 
								...el,
								owed 				: el.owed + increaseAll
							}
						}
						return el;
					})
				}
				
				localStorage.rents = JSON.stringify(updatedData);

				return updatedData;

		default: 
			return state;
	}
};

export const isAmountLoading = (state=[], action) => {
	switch(action.type){
		case 'AMOUNT_IS_LOADING':
			return action.isAmountLoading;
			
		default:
			return state;
	}
};