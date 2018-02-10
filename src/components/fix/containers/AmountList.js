import React, { Component }     from 'react';
//import * as todoActions  			from '../../../actions/todoActions';
import * as rentActions  				from '../../../actions/rentActions';
import { connect } 							from 'react-redux';
import PropTypes  							from 'prop-types';
import Pagination    						from '../../pagination/Pagination';

/*
b.getAttribute('data-input-type') //retrieve  value from node
*/
const monthFix = (month) => {
	month = month.toLowerCase().trim();
	const monthsArr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
	
	let currentMonth = monthsArr.find( (m) => {
    if(m.indexOf(month) >= 0){
			return monthsArr
		}
		return null; //es lint throws warning
  })
  currentMonth = currentMonth.toUpperCase()
	return currentMonth;
};

const RentData = ({item, update, index, updateIndex, show, editRent}) => {
	var a='', b='', c='';
	if(!show){
		return (
			<div>
				<h6>{monthFix(item.month)}</h6>
				<p>Amount Paid: ${item.payment1} -  Date: {item.date1}</p>
				<p style={{'display': item.payment2 ? 'block' : 'none'}}>Amount Paid: ${item.payment2} -  Date: {item.date2}</p>
				<p style={{'display': item.payment3 ? 'block' : 'none'}}>Amount Paid: ${item.payment3} -  Date: {item.date3}</p>
				<h6>Total Month Paid: ${item.monthTotal}</h6>
				<h6>Amount Owed: <span className="owed">${item.owed}</span></h6>	
			</div>
		)
	}else{
		return (
			<div>
				<input type="text" ref={(node) => a = node} data-input-type="month" placeholder={item.month} />
				<input type="text" ref={(node) => b = node} data-input-type="payment1" placeholder={item.payment1} />
				<input type="text" ref={(node) => c = node} data-input-type="date" placeholder={item.date1} />
				<button onClick={()=>{
					editRent(a.value, item.id, b.value, index, c.value)
				}}>send update</button>
			</div>
		)
	}
};//

const Amount = ({item, index, edit, editRent, update, toggleUpdate, show}) => {
	return (
		<div className="payments">
			<RentData item={item} index={index} update={update} show={show} editRent={editRent} />
			<button 
				className="edit" 
				style={{display: !!edit ? 'block' : 'none'}} 
				onClick={(e) => {
					toggleUpdate(index)
				}}
			>
				update
			</button>

			<div style={{clear: "both"}}></div>		
			<hr />
		</div>
	);
}
//
class AmountList extends Component{
	static propTypes = {
		amount 			: PropTypes.array,
		edit 				: PropTypes.bool,
		editRent 		: PropTypes.func,
		toggleUpdate: PropTypes.func,
		update 			: PropTypes.bool,
		updateIndex : PropTypes.number
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