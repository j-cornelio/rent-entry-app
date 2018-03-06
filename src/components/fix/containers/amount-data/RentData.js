import React from 'react';

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
				<p style={{'display': item.payment4 ? 'block' : 'none'}}>Amount Paid: ${item.payment4} -  Date: {item.date4}</p>
				<h6>Total Month Paid: ${item.monthTotal}</h6>
				<h6>Amount Owed: <span className="owed">${item.owed}</span></h6>	
			</div>
		)
	}else{
		return (
			<div>
				<input type="text" ref={(node) => a = node} data-input-type="month" placeholder={item.month} />
				<input type="text" ref={(node) => b = node} dpata-input-type="payment1" placeholder={item.payment1} />
				<input type="text" ref={(node) => c = node} data-input-type="date" placeholder={item.date1} />
				<button onClick={()=>{
					editRent(a.value, item.id, b.value, index, c.value)
				}}>send update</button>
			</div>
		)
	}
};

export default RentData;