import React, { Component }     from 'react';

const data = [{name:'aaa', id:0}, {name:'bbb', id:1}, {name:'ccc', id:2}];

//function stateless pure component.
const Name = ({name, idx, show}) => {
	return (
		<h4 onClick={()=> {
			show(idx)
		}}>{name}</h4>
	)
};
//
const NameList = ({data, show}) => {
	console.log('DATA: ', data)
	return (
		data.map( (el, idx) => {
			return <Name key={el.id} {...el} idx={idx} show={show} />
		})
	)
};
//
class Template extends Component{
	state = {
		data
	}

	show(idx){
		console.log('show: ', idx)
	}

	render(){
		return (
			<NameList {...this.state} show={this.show.bind(this)} />
		)
	}
};

export default Template;