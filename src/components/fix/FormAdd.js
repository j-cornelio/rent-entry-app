import React, { Component } from 'react';
import PropTypes     		from 'prop-types';
import * as rentActions  	from '../../actions/rentActions';
import ErrorDisplay 		from '../Error';
import { connect } 			from 'react-redux';
import TextField			from '../material/TextField';
import RaisedButton 		from '../material/RaisedButton';
import Dialog 				from '../material/Dialog';

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

	//loop over each input and error para
	for(var input of inputs){
		// reset message
		input.nextSibling.firstChild.classList.remove('lineError');
		input.parentNode.nextSibling.innerText = '';

		//make sure it's a month
		if(input.placeholder.indexOf('month') === 0){
			let res 		= [],
				month 		= input.value.toLowerCase().trim(),
				monthsArr 	= ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
				
			let currentMonth = monthsArr.forEach( (m) => {
			    if(m.indexOf(month) === -1){
			    	res.push(false)
				}
		  	});
			if( res.length === 12 ){
				input.parentNode.nextSibling.innerText = 'please enter valid month';
				input.nextSibling.firstChild.classList.add('lineError')				
			}
		}

		//make sure enter number for payment
		if(input.placeholder.indexOf('payment') === 0){
			let err = document.createElement('p');
			if( isNaN(Number(input.value))  ){
				input.parentNode.nextSibling.innerText = 'payment requires numbers';
				input.nextSibling.firstChild.classList.add('lineError')
			}
		}
		// check special characters
		if(SPECIALC.test( input.value )){
			let err = document.createElement('p');
			input.parentNode.nextSibling.innerText = 'special characters';
			input.nextSibling.firstChild.classList.add('lineError')
		}
		// check length
		if(input.value.length === 0){
			let err = document.createElement('p');
			input.parentNode.nextSibling.innerText = 'required field';
			input.nextSibling.firstChild.classList.add('lineError')
	    }
	}

	// for error message box
	Object.keys(values)
		.forEach( el =>  {
			if(values[el].length === 0)
				message.push(el + ' is empty');
			
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
				<TextField hintText={payment} />
				<p className="errorMessage"></p>
			</div>
			<div className="child">
				<TextField hintText={date} onKeyPress={(e)=> {
						if(e.charCode === 13){
							e.preventDefault();

							inputValues = getData('#dataForm');

							valid(inputValues, addRent, validate);
						}
					}} />

				<p className="errorMessage"></p>
			</div>
		</div>
	)
}//
Inputs.propTypes = {
	payment 	: PropTypes.string.isRequired,
	date 		: PropTypes.string.isRequired,  
	addRent 	: PropTypes.func.isRequired, 
	validate 	: PropTypes.func,
};
Inputs.defaultProps = {
  	validate 	: function(){}
};

const FormData = ({data, addInput, removeInput, addRent, validate, errors}) => {
	// for needs id cuz inputs are added dynamicall
	let myForm={}, inputValues={};

	return (
		<div>
			<form  id="dataForm" ref={(form) => myForm = form}>
				<ErrorDisplay errors={errors} />
				
				<TextField hintText="month" />
				<p className="errorMessage"></p>
				
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

    			<RaisedButton 
    				label="Submit"
    				 primary={true}
    				onClick={(e) => {
						e.preventDefault();
						inputValues = getData('#dataForm');

						valid(inputValues, addRent, validate);
					}} />

				<RaisedButton 
					label="Add Input"
					 primary={true} 
					onClick={(e) => {
						e.preventDefault();
						addInput();
					}} />

				<RaisedButton 
					label="Remove Input"
					primary={true} 
					onClick={(e) => {
						e.preventDefault();
						removeInput();
					}} />
			</form>
		</div>
	)
};//
FormData.propTypes = {
	data 		: PropTypes.arrayOf(PropTypes.object), 
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

	state = { 
		data,
		open: false 
	}

	componentWillMount() {
		if(!localStorage.AMOUNT) 
			this.setState((state) => ({open: true})                                                                 )
	}

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

	handleOpen = () => {
		this.setState( state => ({open : true}) )
	}

	handleClose = () => {
		this.setState( state => ({ open: false }) )
	}

	handleSubmit = () => {
		let data = document.querySelector('#amountInput').value;

		data = parseInt(data, 10);

		if(isNaN(data))
			return alert('Please Enter Number');
		
		localStorage.AMOUNT = data;
		this.props.amountSet(data);

		this.handleClose();   
	}

	render(){
		let a = null;
		return (
			<div>
				{/*<h4>{JSON.stringify(this.state.open)}</h4>*/}
				<Navigation {...this.props} />

				<FormData 
					{...this.state} 
					{...this.props}
					addRent 		= {this.props.addRent}
					removeInput 	= {this.removeInput} 
					addInput		= {this.addInput} 
				/>


		    	<Dialog title="Please Enter Agreed Rent" {...this.state} handleClose={this.handleClose}>
		    		<TextField id="amountInput" hintText="amount" />
		    		<RaisedButton label="Submit" onClick={this.handleSubmit} />
		    	</Dialog>
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
		amountSet : amount => dispatch({type:'AMOUNT_SET', amount}),
		//validate  : (payload) => dispatch( rentActions.validate(payload) ),
		// postAmounts  : (data) => dispatch( rentActions.postAmounts(data) ),
		// fetchAmounts : () => dispatch( rentActions.fetchAmounts() )
	}
};

export default connect(mapStateToProps, mapDispatchProps)(FormAdd);
