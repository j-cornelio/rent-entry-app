import React, { Component }     from 'react';
/* eslint-disable */
import * as rentActions  				from '../../actions/rentActions';
import { connect } 							from 'react-redux';
import PropTypes  							from 'prop-types';
import FormAdd  								from './FormAdd';
import AmountList    						from './containers/amount-data/AmountList';

class Amount extends Component{

	state = {
		edit 	 			: false,
		update 			: false,
		updateIndex : null
	}

	toggleEdit(){
		this.setState((state, props) => {
			return { 
				edit 	 			: !state.edit,
				update 			: false,
				updateIndex : null
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
};//

export default Amount;