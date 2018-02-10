import React, { Component }     from 'react';
	// paginate(state, action={}){
	// 	switch(action.type){
	// 		case 'NEXT_SET':
	// 			return state.slice(start += 5, end += 5)
					
	// 		case 'PREVIOUS_SET':
	// 			return state.slice(start -= 5, end -= 5)

	// 		default: 
	// 			return state.slice(0, 5);
	// 	}
	// }

const RECORDS = 3;

const Name = ({name, idx}) => {
	return (
		<h4>{name}</h4>
	)
};
//
const Controls = ({next, previous, pages, current}) => {
	let buttons = [];
	for(let idx=0; idx<pages; idx+=1){
		buttons.push(<button key={idx} onClick={() => {
			current(idx+1);
		}}>{idx+1}</button>)
	}
	//
	return (
		<div>
			<button onClick={previous}>BACK</button>
			{buttons}
			<button onClick={next}>NEXT</button>
			<span>Total pages: {pages}</span>
		</div>
	)
};
//
const NameList = ({data, next}) => {
	return (
		data.map( (el, idx) => {
			return <Name key={idx} {...el} idx={idx} />
		})
	)
};
//
class Pagination extends Component{
	constructor(props){
		super(props);
		
		this.state = {
			data: this.props.data,
			index: 1
		}

		this.pages = Math.ceil(this.props.data.length / RECORDS);

		this.start = 0;
		this.end = RECORDS;
	}

	componentDidMount(){
		this.setState((state) => {
			return {
				data : state.data.slice(this.start, this.end)
			}
		})	
	}

	current(idx){
		this.end = idx * RECORDS;
		this.start = this.end - RECORDS;
		
		this.setState((state) => {
			return {
				data : this.props.data.slice(this.start, this.end)
			}
		})
	}

	next(){
		if(this.end > this.props.data.length) return;
		
		let start = this.start += RECORDS;
		let end   = this.end += RECORDS;

		//data  : this.props.data.slice(start += RECORDS, end += RECORDS)

		this.setState((state, props) => {
			return {
				data : this.props.data.slice(start, end)
			}
		})
	}

	previous(){
		if(this.start === 0) return

		let start = this.start -= RECORDS;
		let end   = this.end -= RECORDS;

		//data  : this.props.data.slice(start += RECORDS, end += RECORDS)

		this.setState((state, props) => {
			return {
				data : this.props.data.slice(start, end)
			}
		})
	}

	render(){
		return (
			<div>
				<NameList {...this.state} />
				<Controls 
					next={this.next.bind(this)} 
					previous={this.previous.bind(this)}
					pages={this.pages}
					current={this.current.bind(this)} 
				/>
				<h5>page: {this.state.index}</h5>
			</div>
		)
	}
};

export default Pagination;