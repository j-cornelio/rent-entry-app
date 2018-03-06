import React from 'react';

const Error = ({message}) => {
	return (
		<h4>{message}</h4>
	)
};//
Error.propTypes = {
  message: PropTypes.string
};
Error.defaultProps = {
  message: ''
};

export default Error;