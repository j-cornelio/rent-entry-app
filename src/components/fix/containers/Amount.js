import React  		from 'react';
import RentData    	from './RentData';


const Amount = ({item, index, edit, editRent, update, toggleUpdate, show}) => {
	return (
		<div className="payments">
			<RentData item={item} index={index} update={update} show={show} editRent={editRent} />
			<button 
				className="edit" 
				style={{display: !!edit ? 'block' : 'none'}} 
				onClick={(e) => {
					toggleUpdate(index);
				}}
			>
				update
			</button>

			<div style={{clear: "both"}}></div>		
			<hr />
		</div>
	);
}

export default Amount;