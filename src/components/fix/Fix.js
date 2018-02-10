import React, { Component }     from 'react';
/* eslint-disable */
import * as rentActions  		from '../../actions/rentActions';
import { connect } 				from 'react-redux';
import PropTypes  				from 'prop-types';
import FormAdd  				from './FormAdd';
import AmountList    			from './containers/AmountList';

var names = [{name:'aaa'}, {name:'bbb'}, {name:'ccc'}, {name:'ddd'}, {name:'eee'}, {name:'fff'}, {name:'ggg'}, {name:'hhh'}, {name:'iii'}, {name:'jjj'}, {name:'kkk'}, {name:'lll'}, {name:'mmm'}, {name:'nnn'}, {name:'ooo'}, {name:'ppp'}, {name:'qqq'}, {name:'rrr'}, {name:'sss'}, {name:'ttt'}, {name:'uuu'}, {name:'vvv'}, {name:'www'}, {name:'xxx'}, {name:'yyy'}, {name:'zzz'}, {name:'AAA'}, {name:'BBB'}, {name:'CCC'}, {name:'DDD'}];

/*
NOTE:
  - constructor functions need binding
  - mapping - index goes on constructor
	- looping can spread in {...item}
	- component single root elem
	- presentational comp don't specify behavior
*/

class Amount extends Component{
	state = {
		edit 	 	: false,
		update 		: false,
		updateIndex : null
	}
	// componentDidMount(){
	// 	this.props.fetchAmounts();
	// }
	componentWillUpdate(nextProps, nextState){
		//console.log('nextProps last obj on amount arr', nextProps.amount[nextProps.amount.length-1]);
	}
	toggleEdit(){
		this.setState((state, props) => {
			return { 
				edit 	 			: !state.edit,
				update 			: false,
				updateIndex : false
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

Amount.propTypes = {
  amount: PropTypes.array,
};
