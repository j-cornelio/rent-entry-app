import React, { Component }     from 'react';

var count = 1;

const data = [{payment:'payment #1', date:'date #1'}];

const show = (a) => console.log(a);

const Inputs = ({payment,  date, more}) => {
	var a = '', b='';
	console.log('this: ', this)
	return (
		<div>
			<input ref={input => a 	= input} placeholder={payment} /> 
			<input ref={input => b 	= input} placeholder={date} />			
			<input type="button" value="Add" onClick={(e) => {
				e.preventDefault();
			}} />
			<button onClick={(e) => {
				e.preventDefault();
				more()
			}}>
			add new input
			</button>
		</div>
	)
}
 
const FormData = ({data, more, score, increase}) => {
	var myForm = null, a='';
	return (
		<form ref={(form) => myForm = form}>
			<h6>{score}</h6>
			<button onClick={(e) => {
				e.preventDefault();
				increase()
			}}>increase</button>
			{data.map( (el, idx) => <Inputs {...el} key={idx}  more={more} />)}
		</form>
	)
};

class FormAdd extends Component{
	state = {
		data,
		score : 0
	}
	more(){
		this.setState((state, props) => {
			count += 1;
			return {
				data: [
					...state.data,
					{ 
						payment : 'payment #' + count, 
						date 	: 'date #' + count 
					}
				]
			}
		})
	}
	increase(){
		this.setState((state, props) => {
			return {score: state.score + 1}
		})
	}
	render(){
		return (
			<FormData {...this.state} more={this.more.bind(this)} increase={this.increase.bind(this)} />
		)
	}
};


export default FormAdd;
