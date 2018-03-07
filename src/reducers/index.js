import { combineReducers } from 'redux';
import { 
	rentReducer, 
	isAmountLoading, 
	validate,
	amountSet 
} 							from './rentReducers';
export default combineReducers({
	amount			: rentReducer,
	errors 			: validate,
	rentAmount 		: amountSet,
	isAmountLoading,
})

//gets created as store, passed to Provider then connected - passed state as prop