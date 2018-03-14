import React, { Component } from 'react';
import PropTypes     		from 'prop-types';

const RECORDS = 12;
const pageAmount = (pages) => Math.ceil(pages.length / RECORDS);

const Controls = ({next, currentPage, previous, pages, current}) => {
	let buttons = [];
	for(let idx=0; idx<pages; idx+=1){
		buttons.push(<button key={idx} style={(currentPage-1) === idx ? {background:'#ddd'} : {background:''}} onClick={() => {
			current(idx+1);
		}}>{idx+1}</button>)
	}//
	return (
		<div>
			<button onClick={previous}>BACK</button>
			{buttons}
			<button onClick={next}>NEXT</button>
			{/*<span>Total pages: {pages}</span>*/}
		</div>
	)
};//
Controls.propTypes = {
	next 		: PropTypes.func.isRequired,
  	currentPage : PropTypes.number,
	previous 	: PropTypes.func.isRequired, 
	current 	: PropTypes.func.isRequired, 
	pages		: PropTypes.number,
};
Controls.defaultProps = {
	pages 		: 0,
	currentPage : 0
};

const NameList = ({ data }) => {
	return (
		data.map( (el, idx) => {
			return el
		})
	)
};
NameList.propTypes = {
	data 		: PropTypes.array,
};
NameList.defaultProps = {
	data 		: []
};

class Pagination extends Component{
	static propTypes = {
		data: PropTypes.array.isRequired
    }

	constructor(props){
		super(props);

		this.previous = this.previous.bind(this);
		this.current  = this.current.bind(this);
		this.next 	  = this.next.bind(this);

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
			<div id="pagination">
				<NameList {...this.state} />
				<Controls 
					currentPage={this.state.currentPage}
					next={this.next} 
					previous={this.previous}
					pages={this.pages}
					current={this.current} 
				/>
				{/*<h5>page: {this.state.index}</h5>*/}
			</div>
		)
	}
};

export default Pagination;