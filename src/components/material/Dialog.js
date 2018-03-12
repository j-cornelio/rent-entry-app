import React, { Component } 		from 'react';
import FlatButton 					from './FlatButton';
import PropTypes    				from 'prop-types';

var DIV = document.createElement('div');

class Dialog extends Component{
	componentWillReceiveProps(nextProps) {
		if(nextProps.open){
			document.querySelector('#dialog').classList.add('dialogMove');

			DIV.classList.add('overlay');
			document.body.appendChild(DIV);

			DIV.onclick = nextProps.handleClose;
		}
		if(!nextProps.open){
			const overlay = document.querySelector('.overlay');


			document.querySelector('#dialog').classList.remove('dialogMove');
			//document.querySelector('.overlay').classList.remove('overlay')			
			overlay.parentNode.removeChild(overlay);

		}	
	}

	componentWillUnmount() {
		console.log('UNMOUNTED')
	}

	render(){
		let { title, open, handleClose, children } = this.props;
		if(open){
			return (
				<div id="dialog">
					<div className="innerDialog">
						<h3>{title}</h3>
						<div className="children">{children}</div>
						<footer>
							<FlatButton label="Cancel"  onClick={handleClose} />
						</footer>
					</div>
				</div>
			);
		}
		return <div id="dialog"></div>;
	}
};//
FlatButton.propTypes = {
	title 	  		: PropTypes.string,
	actions   		: PropTypes.array,
	modal 			: PropTypes.bool,
	open  			: PropTypes.bool,
	onRequestClose 	: PropTypes.func
}

export default Dialog;