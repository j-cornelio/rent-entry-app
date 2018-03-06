import React from 'react';
import PropTypes     		from 'prop-types';

const PopUp = ({message}) => {
	return (
		<div id="popup">
			<p>{message}</p>
		</div>
	);	
};
PopUp.propTypes = {
  message: PropTypes.string
};
PopUp.defaultProps = {
  message: ''
};

export default PopUp;