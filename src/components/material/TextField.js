import React from 'react';
import PropTypes from 'prop-types';

const parent = {
	    fontSize: '16px',
    lineHeight: '24px',
    width: '256px',
    height: '48px',
    display: 'inline-block',
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontFamily: 'Roboto, sans-serif',
    transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    cursor: 'auto'
}
const inputs = {
	padding: '0px',
    position: 'relative',
    width: '100%',
    border: 'none',
    outline: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'inherit',
    fontStyle: 'inherit',
    fontVariant: 'inherit',
    fontWeight: 'inherit',
    fontStretch: 'inherit',
    fontSize: 'inherit',
    lineHeight: 'inherit',
    fontFamily: 'inherit',
    opacity: '1',
    //-webkit-tap-highlight-color: rgba(0, 0, 0, 0),
    height: '100%'
}

const TextField = ({hintText, onKeyPress, id}) => {
    let a = '';

	return (
		<div style={parent}>
			<div className="inner"></div>
			<input 
                type="text"  
                style={inputs} 
                placeholder={hintText} 
                id={id}
                onFocus={() => {
                    a.classList.add('expand');
                }}
                 onBlur={() => {
                    a.classList.remove('expand');
                }} 
                onKeyPress={onKeyPress}
                />
			<div style={{display: 'block'}}>
				<hr aria-hidden="true" className="hr-field" />
				<hr aria-hidden="true" ref={(input) => a = input } className="hr-field2" />
			</div> 
		</div>
	);	
};//
TextField.propTypes = {
	hintText 	  : PropTypes.string,
}

export default TextField;