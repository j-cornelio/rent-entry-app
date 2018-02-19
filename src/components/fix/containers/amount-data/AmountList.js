import React, { Component }     from 'react';
//import * as todoActions  			from '../../../actions/todoActions';
import * as rentActions  				from '../../../../actions/rentActions';
import { connect } 							from 'react-redux';
import PropTypes  							from 'prop-types';
import Pagination    						from '../../../pagination/Pagination';
import Amount    						from './Amount';

/*
b.getAttribute('data-input-type') //retrieve  value from node
*/

class AmountList extends Component{
	static propTypes = {
		amount 			: PropTypes.array.isRequired,
		edit 			: PropTypes.bool.isRequired,
		editRent 		: PropTypes.func.isRequired,
		toggleUpdate 	: PropTypes.func.isRequired,
		update 			: PropTypes.bool,
		//updateIndex 	: PropTypes.null
	}

	static defaultProps = {
		edit 			: false,
		update 			: false,
	}
	 

	render(){
		let {amount, editRent, edit, update, toggleUpdate, updateIndex}  = this.props;
		
		if(amount===null || typeof amount === 'undefined') amount = [];

		const rentList = amount.map( (item, index) => {
					return (
						<Amount
							key={item.id}
							update={update}
							item={item} 
							index={index}
							editRent={editRent} 
							edit={edit}
							toggleUpdate={toggleUpdate}
							show={updateIndex===index}
						/>
					)
				})

		return (
			<div id="breakdown">
				<Pagination data={rentList} />

				<pre>{JSON.stringify(amount)}</pre>
			</div>
		)
	}
};
//
const mapStateToProps = (state) => {
	return {
		amount: state.amount
	}
};
const mapDispatchProps = (dispatch) => {
	return {
		editRent : (month, id, amount, idx, date) => dispatch( rentActions.editRent(month, id, amount, idx, date) ),
		// postAmounts  : (data) => dispatch( rentActions.postAmounts(data) ),
		// fetchAmounts : () => dispatch( rentActions.fetchAmounts() )
	}
};

export default connect(mapStateToProps, mapDispatchProps)(AmountList);