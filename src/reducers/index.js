import { combineReducers } 									from 'redux';
import { todoReducer, visibilitityFilter, isTodoLoading } 	from './todoReducers';
import { rentReducer, isAmountLoading } 					from './rentReducers';
export default combineReducers({
	todos 				: todoReducer,
	visibilitityFilter 	: visibilitityFilter,
	amount				: rentReducer,
	isTodoLoading,
	isAmountLoading,
})

//gets created as store, passed to Provider then connected - passed state as prop