import React, { Component } from 'react';

//Adding new props
var ppHOC = (WrappedComponent) => {
  return class RefsHOC  extends Component {
    render() {
		console.log('%c HOC: ', 'background: beige', this.props);

		const newProps = {
			user: {name:'Phil', last:'Smith'}
		}
		//retreive - const Person = ({name, user})

     	return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

export default ppHOC;
