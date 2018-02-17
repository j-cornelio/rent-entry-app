import React, { Component }     from 'react';
/* eslint-disable */
import * as rentActions  				from '../../actions/rentActions';
import { connect } 							from 'react-redux';
import PropTypes  							from 'prop-types';
import FormAdd  								from './FormAdd';
import AmountList    						from './containers/amount-data/AmountList';

class Amount extends Component{
	static propTypes = {
	  amount: PropTypes.array.isRequired,
	};

	state = {
		amount 			: [],
		edit 	 			: false,
		update 			: false,
		updateIndex : null
	}

	toggleEdit(){
		this.setState((state, props) => {
			return { 
				edit 	 			: !state.edit,
				update 			: false,
				updateIndex : 0
			}
		})
	}

	toggleUpdate(idx){
		this.setState((state, props) => {
			return { 
				update 			: !state.update,
				updateIndex : idx
			}
		})
	}

	render(){
		return (
			<div>
				<h2>Rent Entry System</h2>
				<button className="edit" onClick={this.toggleEdit.bind(this)}>edit</button>
				<FormAdd  {...this.props} />
				<hr />
				<AmountList {...this.state} toggleUpdate={this.toggleUpdate.bind(this)} />
				<hr />
			</div>
		)
	}
};

// passed as props to Component
const mapStateToProps = (state) => {
	return {
		amount : state.amount,
	}
};

const mapDispatchProps = (dispatch) => {
	return {
		addRent  : (text, id) => dispatch( rentActions.addRent(text, id) ),
		// postAmounts  : (data) => dispatch( rentActions.postAmounts(data) ),
		// fetchAmounts : () => dispatch( rentActions.fetchAmounts() )
	}
};

export default connect(mapStateToProps, mapDispatchProps)(Amount);