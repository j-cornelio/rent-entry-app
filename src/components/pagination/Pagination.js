import React, { Component } from 'react';
import PropTypes     		from 'prop-types';

const RECORDS = 3;
const pageAmount = (pages) => Math.ceil(pages.length / RECORDS);

const Controls = ({next, currentPage, previous, pages, current}) => {
	let buttons = [];
	for(let idx=0; idx<pages; idx+=1){
		buttons.push(<button key={idx} style={(currentPage-1) === idx ? {background:'#ccc'} : {background:''}} onClick={() => {
			current(idx+1);
		}}>{idx+1}</button>)
	}
	//
	return (
		<div>
			<button onClick={previous}>BACK</button>
			{buttons}
			<button onClick={next}>NEXT</button>
			{/*<span>Total pages: {pages}</span>*/}
		</div>
	)
};//

const NameList = ({data, next}) => {
	return (
		data.map( (el, idx) => {
			return el
		})
	)
};
//
class Pagination extends Component{
	static propTypes = {
		data: PropTypes.array
    }

	constructor(props){
		super(props);
		
		this.state = {
			data		: this.props.data,
			index		: 1,
			currentPage : 1,
		}

		this.pages 	= pageAmount(this.props.data);
		this.start 	= 0;
		this.end 	= RECORDS;
	}

	componentDidMount(){
		this.setState((state) => {
			return {
				data : this.props.data.slice(this.start, this.end)
			}
		})	
	}

	componentWillReceiveProps(nextProps){
		this.setState((state) => {
			return {
				data : nextProps.data.slice(this.start, this.end)
			}
		})
		this.pages = pageAmount(nextProps.data);
	}

	current(idx){
		this.index = idx;
		this.end = idx * RECORDS;
		this.start = this.end - RECORDS;
		
		this.setState((prevState) => {
			return {
				data : this.props.data.slice(this.start, this.end),
				currentPage: idx
			}
		})
	}

	next(){
		if(this.end >= this.props.data.length) return;
		
		let start = this.start += RECORDS;
		let end   = this.end += RECORDS;

		//data  : this.props.data.slice(start += RECORDS, end += RECORDS)

		this.setState((prevState, props) => {
			return {
				data : this.props.data.slice(start, end),
				currentPage: prevState.currentPage + 1
			}
		})
	}

	previous(){
		if(this.start === 0) return

		let start = this.start -= RECORDS;
		let end   = this.end -= RECORDS;

		//data  : this.props.data.slice(start += RECORDS, end += RECORDS)

		this.setState((prevState, props) => {
			return {
				data : this.props.data.slice(start, end),
				currentPage: prevState.currentPage - 1 
			}
		})
	}

	render(){
		return (
			<div>
				<NameList {...this.state} />
				<Controls 
					currentPage={this.state.currentPage}
					next={this.next.bind(this)} 
					previous={this.previous.bind(this)}
					pages={this.pages}
					current={this.current.bind(this)} 
				/>
				{/*<h5>page: {this.state.index}</h5>*/}
			</div>
		)
	}
};

export default Pagination;