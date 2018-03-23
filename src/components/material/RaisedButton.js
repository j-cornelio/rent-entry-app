import React 		from 'react';
import PropTypes 	from 'prop-types';
import classNames 	from 'classnames';

const RaisedButton = ({label, primary, secondary, disabled, onClick, style, className}) => {
		//let myClass = '';

		// switch(true){
		//     case primary:
		// 		myClass = 'primary';
		// 		break;

		//     case secondary:
		// 		myClass = 'secondary';
		// 		break;

		// 	default:
		// 		myClass = 'default'
		// }

		var theStyles = classNames({
				default: true,
				primary,
				secondary,
				'raised': true,
				style,
			});

		return (
			<div className="buttonWrap" style={style}>
				<button 
					onClick={onClick} 
					className={theStyles}
				>
					<span>{label}</span>
				</button>
			</div>
		);
};//
RaisedButton.propTypes = {
	label 	  : PropTypes.string,
	primary   : PropTypes.bool,
	secondary : PropTypes.bool,
	disabled  : PropTypes.bool
}

export default RaisedButton;