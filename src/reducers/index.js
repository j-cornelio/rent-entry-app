import { combineReducers } 									from 'redux';
import { rentReducer, isAmountLoading, validate } 					from './rentReducers';
export default combineReducers({
	amount				: rentReducer,
	isAmountLoading,
	errors: validate
})

//gets created as store, passed to Provider then connected - passed state as prop