import React, { Component }     from 'react';
/* eslint-disable */
import * as rentActions  		from '../../actions/rentActions';
import { connect } 				from 'react-redux';
import PropTypes  				from 'prop-types';
import FormAdd  				from './FormAdd';
import AmountList    			from './containers/amount-data/AmountList';
import RaisedButton 			from '../material/RaisedButton';

class Amount extends Component{
	static propTypes = {
		edit 		: PropTypes.bool,
		update 		: PropTypes.bool,
		updateIndex : PropTypes.node
    }
	static defaultProps = {
		edit 		: false,
		update 		: false,
		updateIndex : null
    }

	state = {
		edit 	 	: false,
		update 		: false,
		updateIndex : null
	}

	toggleEdit = () => {
		this.setState((state, props) => {
			return { 
				edit 	 	: !state.edit,
				update 		: false,
				updateIndex : null
			}
		})
	}

	toggleUpdate = (idx) => {
		this.setState((state, props) => {
			return { 
				update 		: !state.update,
				updateIndex : idx
			}
		})
	}

	render(){
		return (
			<div>
				<h2>Rent Data Entry System</h2>
				<RaisedButton 
					style={{float: 'right'}}
					label="Edit" 
					primary={true}
					onClick={this.toggleEdit} 
				/>
				<FormAdd  {...this.props} />
				<hr />
				<AmountList {...this.state} toggleUpdate={this.toggleUpdate} />
				<hr />
			</div>
		)
	}
};//

export default Amount;