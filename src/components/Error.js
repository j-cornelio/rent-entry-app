import React from 'react';
import PropTypes     		from 'prop-types';

const Error = ({errors}) => {
	if(errors.length === 0) return null;

	return (
		<div id="errorBox">
			{errors.map( err => <p key={err}>{err}</p> )}
		</div>
	);	
}

export default Error;

Error.propTypes = {
  errors: PropTypes.array
};

Error.defaultProps = {
  errors: []
};