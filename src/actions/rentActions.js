import request from 'superagent';
import * as actionTypes from './actionTypes';

 /* eslint-disable */
const APIURL      = 'http://rest.learncode.academy/api/ivonne/rent';
const APIURLPOST  = 'http://rest.learncode.academy/api/ivonne/';

export const addRent = (amount, id) => {
  return {
    type    : actionTypes.ADD_RENT,
    amount,
    id
  }
};

export const editRent = (month, id, amount, index, date) => {
  return {
    type    : actionTypes.EDIT_RENT,
    id,
    amount,
    index,
    date,
    month
  }
};

export const postAmounts = (data) => {
  return (dispatch) => {
    return request.post(APIURL) 
    	.send(data)
      .then( response => { //also returns promise 
     		console.log('%c rsonponse ', 'background:lime', JSON.stringify(response.body));
      })
  }
};

export const fetchAmounts = () => {
  return (dispatch) => {

    dispatch( isAmountLoading(true) ); // immediate dispatch, loader

    return request.get(APIURL) // asynch task returns promise obj
      .then( response => { //also returns promise 
        if(!response.ok){
          throw Error(response.statusText);
        }

        dispatch( isAmountLoading(false) );

     		console.log('%c RESPONSE ', 'background:lime', response.body);
        return response; // returns to next chained then
      })
      .then( response => { 

        dispatch( fetchAmountSuccess( response.body ) );

      })
      .catch( error => {
        throw Error(error);
      })
  }
};
export const fetchAmountSuccess = (amount) => {
  return {
    type 						: actionTypes.FETCH_AMOUNT_SUCCESS,
    amount 					: amount,
  }
};
export const isAmountLoading = (bool) => {
  return {
    type            : actionTypes.AMOUNT_IS_LOADING,
    isAmountLoading : bool
  }
};
 