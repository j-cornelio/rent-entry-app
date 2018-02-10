import React, { Component } from 'react';

//HOC receives props - Props Proxy
var ppHOC = (propName) => (WrappedComponent) => {
  return class PP extends Component {
    render() {
  		console.log('propName: ', propName);
  		console.log('HOC: ', this.props);
     	return typeof this.props[propName] == 'string' ? <h1>string</h1> : <WrappedComponent {...this.props} />
    }
  }
}

export default ppHOC;

// <WrappedComponent {...this.props}/>
// is equivalent to
// React.createElement(WrappedComponent, this.props, null)