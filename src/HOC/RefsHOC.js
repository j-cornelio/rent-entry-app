import React, { Component } from 'react';

//Adding new props
var refsHOC = (WrappedComponent) => {

  return class RefsHOC  extends Component {
	proc(wrappedComponentInstance) {
      wrappedComponentInstance.method()
    }
    render() {
    	const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
		console.log('%c props: ', 'background: beige', props);

     	return <WrappedComponent {...this.props} />
    }
  }
}

export default refsHOC;
