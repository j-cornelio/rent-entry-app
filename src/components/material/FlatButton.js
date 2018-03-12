import React from 'react';
import PropTypes from 'prop-types';

const FlatButton = ({label, primary, secondary, disabled, onClick}) => {
		let myClass = '';

		switch(true){
		    case primary:
				myClass = 'primary';
			break;

		    case secondary:
				myClass = 'secondary';
			break;

			default:
				myClass = 'default'
		}
		return (
			<button 
				onClick={onClick} 
				className={[myClass, 'flat'].join(' ')}
			>
				<span>{label}</span> 
			</button>
		);	
};//
FlatButton.propTypes = {
	label 	  : PropTypes.string,
	primary   : PropTypes.bool,
	secondary : PropTypes.bool,
	disabled  : PropTypes.bool
}

export default FlatButton;