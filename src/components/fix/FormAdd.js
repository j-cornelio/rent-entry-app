import React, { Component } from 'react';
import PropTypes     		from 'prop-types';

/*
NOTE: e.preventDefault on buttons. refreshes page
*/
//const show = (a) => console.log(a);

var count = 1;

/* eslint-disable */
const 
	SPECIALC 		= /[^\w\-/]/, 
	data 			= [{payment:'payment 1', date:'date 1'}],
	removeSpaces 	= str => str.replace(/ +/g, ""),
	randomNum 		= () => Math.floor(Math.random() * 1000000000); 

const getData = (elem) => {
	let inputValues	=	{},
			form 				= document.querySelector(elem);
			
	for(var i=0; i<form.length; i+=1){//myForm not reat array
		if(form[i].type === 'text'){
			var propName = removeSpaces(form[i].placeholder);
			inputValues[propName] = form[i].value 			
		}
	}

	return inputValues;
}

const validate = (values, addRent) => {
	let form 			= document.querySelector('#dataForm'),
			regTest 	= false;

	Object.keys(values).forEach( el =>  {
		if(values[el].length === 0){
			alert(`${el} is empty`);
		}
		
		if(SPECIALC.test( values[el] )){
			alert('Remove special character');
			regTest = true;
		}
	});

	const 
		vals 		= Object.values(values),
		filled 		= vals.every( el => el.length !== 0 );

	if( filled && !regTest ){
		form.reset();
		form[0].focus();
		addRent(values, randomNum());
	}
}

const Inputs = ({payment,  date, addRent}) => {
	var inputValues = {};
	return (
		<div>
			<input placeholder={payment} type="text" />
			<input placeholder={date} type="text" onKeyPress={(e)=> {
					if(e.charCode === 13){
						e.preventDefault();

						inputValues = getData('#dataForm');

						validate(inputValues, addRent);
						
					}
				}} 
			/>
		</div>
	)
}//

const FormData = ({data, addInput, removeInput, addRent}) => {
	let myForm={}, inputValues={};

	return (
		<form  id="dataForm" ref={(form) => myForm = form}>
			<input placeholder='month' type="text" />
			{data.map( (el, idx) => (
					<Inputs 
						{...el} 
						addRent={addRent}
						myForm={myForm}
						removeInput={removeInput} 
						addInput={addInput} 
						key={idx}
					/>
				)
			)}

			<input type="button" value="Send" onClick={(e) => {
				e.preventDefault();
				inputValues = getData('#dataForm');

				validate(inputValues, addRent);
			}} />

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
	)
};
//
class FormAdd extends Component{
	static propTypes = {
		addInput: PropTypes.func, 
		addRent: PropTypes.func,
		amount: PropTypes.array,
		data: PropTypes.array,
		getData: PropTypes.func,
		removeInput: PropTypes.func,
    }

	state = {
		data
	}

	removeInput(){
		if(this.state.data.length === 1){
			return 
		}
		this.setState((state) => {
			count -= 1;
			var last = state.data.length-1;
			//var data = state.data.slice(0, state.data.length -1);

			return {
				data: state.data.filter( (el, idx) => idx !== last )
			}
		})
	}

	addInput(){
		this.setState((state, props) => {
			count += 1;
			return {
				data: [
					...state.data,
					{ 
						payment : 'payment ' + count, 
						date 		: 'date ' + count 
					}
				]
			}
		})
	}

	getData(data){
		console.log('%c data: ', 'background:lime', data);
	}

	render(){
		return (
			<FormData 
				{...this.state} 
				{...this.props}
				addRent={this.props.addRent}
				getData={this.getData.bind(this)} 
				removeInput={this.removeInput.bind(this)} 
				addInput={this.addInput.bind(this)} 
			/>
		)
	}
};

export default FormAdd;
