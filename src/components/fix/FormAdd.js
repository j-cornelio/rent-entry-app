import React, { Component } from 'react';
import PropTypes     		from 'prop-types';
import * as rentActions  	from '../../actions/rentActions';
import ErrorDisplay 		from '../Error';
import Dialog 				from '../Dialog';
import { connect } 			from 'react-redux';

/*
NOTE: e.preventDefault on buttons. refreshes page
*/
//const show = (a) => console.log(a);

var count = 1;

/* eslint-disable */
const 
	SPECIALC 		= /[^\w\-/ ]/, 
	data 			= [{payment:'payment 1', date:'date 1'}],
	removeSpaces 	= str => str.replace(/ +/g, ""),
	randomNum 		= () => Math.floor(Math.random() * 1000000000); 

const getData = (elem) => {
	let inputValues	= {},
		form 		= document.querySelector(elem);
			
	for(var i=0; i<form.length; i+=1){//myForm not React array
		if(form[i].type === 'text'){
			var propName = removeSpaces(form[i].placeholder);
			inputValues[propName] = form[i].value 			
		}
	}
	return inputValues;
}

const valid = (values, addRent, validate) => {
	let 
		form 	= document.querySelector('#dataForm'),
		inputs 	= form.getElementsByTagName('input'),
		regTest = false,
		message = [];

	//for inputs
	for(var key of inputs){
		key.classList.remove('errorInput');

		if(SPECIALC.test( key.value )){
			key.classList.add('errorInput');
			key.nextSibling.innerText = 'special characters';
		}

		if(key.value.length === 0){
			key.classList.add('errorInput');
			key.nextSibling.innerText = 'required field';
	    }
	}

	// for error message box
	Object.keys(values)
		.forEach( el =>  {
			if(values[el].length === 0){
				message.push(el + ' is empty');
			}
			
			if(SPECIALC.test( values[el] )){
				message.push(el + ' Please remove special characters');
				regTest = true;
			}
		});

	validate(message);

	const 
		vals 		= Object.values(values),
		filled 		= vals.every( el => el.length !== 0 );

	if( filled && !regTest ){
		form.reset();
		form[0].focus();
		addRent(values, randomNum());
	}
};



const Navigation = ({rentAmount}) => (
	<nav>
		<h5>AGREED RENT AMOUNT: {rentAmount}</h5>
	</nav>
);
Navigation.propTypes = {
	rentAmount: PropTypes.number
};
Navigation.defaultProps = {
	rentAmount: 0
};

const Inputs = ({payment,  date, addRent, validate}) => {
	var inputValues = {};
	return (
		<div className="flex-container">
			<div className="child">
				<input placeholder={payment} type="text" />
				<p className="errorMessage"></p>
			</div>
			<div className="child">
				<input placeholder={date} type="text" onKeyPress={(e)=> {
						if(e.charCode === 13){
							e.preventDefault();

							inputValues = getData('#dataForm');

							valid(inputValues, addRent, validate);
						}
					}}
				/>
				<p className="errorMessage">Date is required</p>
			</div>
		</div>
	)
}//
Inputs.propTypes = {
	data 		: PropTypes.array, 
	addInput 	: PropTypes.func.isRequired, 
	removeInput : PropTypes.func.isRequired, 
	addRent 	: PropTypes.func.isRequired, 
	validate 	: PropTypes.func,
  	errors 		: PropTypes.array
};
Inputs.defaultProps = {
	data 		: [],
  	errors    	: [],
  	validate 	: function(){}
};

const FormData = ({data, addInput, removeInput, addRent, validate, errors}) => {
	// for needs id cuz inputs are added dynamicall
	let myForm={}, inputValues={};

	return (
		<div>
			<form  id="dataForm" ref={(form) => myForm = form}>
				<ErrorDisplay errors={errors} />
				
				<input placeholder='month' id="month" type="text" />
				<p className="errorMessage">Month is required</p>

				{data.map( (el, idx) => (
						<Inputs
							{...el}
							addRent 	= {addRent}
							myForm		= {myForm}
							removeInput = {removeInput} 
							addInput 	= {addInput} 
							key 		= {idx}
						/>
					)
				)}

				<button onClick={(e) => {
					e.preventDefault();
					inputValues = getData('#dataForm');

					valid(inputValues, addRent, validate);
				}}>Send Data</button>

				<button onClick={(e) => {
					e.preventDefault();
					addInput();
				}}>
					add inputs
				</button>

				<button onClick={(e) => {
					e.preventDefault();
					removeInput();
				}}>
					remove inputs
				</button>
			</form>
		</div>
	)
};//
FormData.propTypes = {
	data 		: PropTypes.array, 
	addInput	: PropTypes.func.isRequired, 
	removeInput : PropTypes.func.isRequired, 
	addRent		: PropTypes.func.isRequired, 
	validate	: PropTypes.func.isRequired,
  	errors 		: PropTypes.array
};
FormData.defaultProps = {
	data 		: [],
  	errors 		: []
};

class FormAdd extends Component{
	static propTypes = {
		addRent : PropTypes.func.isRequired,
		amount 	: PropTypes.array.isRequired,
    }

	state = { data }

	removeInput = () => {
		if(this.state.data.length === 1) return false;
		
		this.setState((state) => {
			count -= 1;
			var last = state.data.length-1;
			//var data = state.data.slice(0, state.data.length -1);

			return {
				data: state.data.filter( (el, idx) => idx !== last )
			}
		})
	}

	addInput = () => {
		this.setState((state, props) => {
			count += 1;
			return {
				data: [
					...state.data,
					{ 
						payment : 'payment ' + count, 
						date  	: 'date ' + count 
					}
				]
			}
		})
	}

	render(){
		return (
			<div>
				{!localStorage.AMOUNT ? <Dialog /> : null}

				<Navigation {...this.props} />

				<FormData 
					{...this.state} 
					{...this.props}
					addRent 		= {this.props.addRent}
					removeInput 	= {this.removeInput} 
					addInput		= {this.addInput} 
				/>
			</div>
		)
	}
};//

// passed as props to Component
const mapStateToProps = (state) => {
	return {
		amount 		: state.amount,
		errors 		: state.errors,
		rentAmount	: state.rentAmount
	}
};

const mapDispatchProps = (dispatch) => {
	return {
		addRent  : (text, id) => dispatch( rentActions.addRent(text, id) ),
		validate : (payload) => dispatch( rentActions.validate( payload ) ),
		//validate  : (payload) => dispatch( rentActions.validate(payload) ),
		// postAmounts  : (data) => dispatch( rentActions.postAmounts(data) ),
		// fetchAmounts : () => dispatch( rentActions.fetchAmounts() )
	}
};

export default connect(mapStateToProps, mapDispatchProps)(FormAdd);
