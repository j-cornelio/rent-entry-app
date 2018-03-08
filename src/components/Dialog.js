import React, { Component } 		from 'react';
import PropTypes    from 'prop-types';
import { connect } 			from 'react-redux';

class Dialog extends Component{
	state = { open: false }

	handleOpen = () => {
		this.setState( state => ({open : true}) )
	}

	handleSubmit = (data) => {
		data = parseInt(data, 10);

		if(isNaN(data))
			return alert('Please Enter Number');
		
		localStorage.AMOUNT = data;
		this.props.amountSet(data)
	}

	handleClose = () => {
		this.setState( state => ({ open: false }) )
	}

	render(){
		return (
			<div id="dialog">
				<p>{this.state.open}</p>
				<p>Enter Rent Amount</p> 
				<p><input ref={a => this.amount = a} type="text" onKeyPress={(e)=> {
						if(e.charCode === 13){
							e.preventDefault();
							this.handleSubmit(this.amount.value)
						}
					}}
					/></p>
				<div>
					<button onClick={(e) => {
						this.handleSubmit(this.amount.value)
					}}>Submit</button>
				</div>
			</div>
		);	
	}
};//

const mapStateToProps = (state) => {
	return { }
};

const mapDispatchProps = (dispatch) => {
	return {
		//sendAmount : amount => dispatch( rentActions.addRent(text, id) ),
		amountSet : amount => dispatch({type:'AMOUNT_SET', amount}),
	}
};

Dialog.propTypes = {
  element: PropTypes.node
};
Dialog.defaultProps = {
  element: <p>Enter Rent Amount <input ref={a => this.amount = a} type="text" /></p>
};

export default connect(mapStateToProps, mapDispatchProps)(Dialog);