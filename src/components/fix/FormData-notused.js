
const AddAmount = ({addRent}) => {
	var rentData = {owed: 0}, a='', b='', c='', d='', ee='', f='', g='', h='', rentForm; 
	
	return (
		<div className="inputs">
			{/* good for static form */}
			<form ref={(form) => rentForm = form}>
				<input ref={input => a 	= input} placeholder="current month" /><br />
				<input ref={input => b 	= input} placeholder="payment #1" />
				<input ref={input => c 	= input} placeholder="date 1" onKeyPress={(e)=> {
					if(e.charCode === 13){
						rentData = {
						  month 		: a.value,
						  payment1	: b.value, 
						  date1			: c.value
						}
						a.focus();
						addRent(rentData, randomNum());
						rentForm.reset();
					}
				}}  /><br />
				<input ref={input => d 	= input} placeholder="payment #2" />
				<input ref={input => ee = input} placeholder="date 2" /><br />
				<input ref={input => f 	= input} placeholder="payment #3" />
				<input ref={input => g 	= input} placeholder="date 3" />
				
				<input type="button" value="Add" onClick={(e) => {
					e.preventDefault();
					rentData = {
					  month 		: a.value,
					  payment1	: b.value, 
					  date1			: c.value,
					  payment2	: d.value, 
					  date2			: ee.value,
					  payment3	: f.value, 
					  date3			: g.value
					}
					a.focus();
					addRent(rentData, randomNum());
					rentForm.reset();

					//postAmounts(rentData); - props: ({postAmounts})
				}} />
			</form>
		</div>
	)
};


const FormData = (props) => {
	return (
		<div>
			<AddAmount addRent={props.addRent} />
		</div>
	)
};

export default FormData;