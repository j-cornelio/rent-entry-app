// const initialTodos = [
// 	{text:'big boss', completed:false, id:99},
// 	{text:'THE man', completed:true, id:77},
// 	{text:'head nigga in charge', completed:false, id:999},
// ];

export const todoReducer = (state=[], action) => {
	switch(action.type){
		case 'ADD_TODO':
			return [
				...state,
				{
					text		: action.text,
					completed	: false,
					id 			: action.id
				}
			];

		case 'TOGGLE_TODO':
			return state.map( todo => {
				if(todo.id === action.id){
					return {
						...todo,
						completed: !todo.completed
					}
				}
				return todo;
			});

		default: 
			return state;
	}
};

export const visibilitityFilter = (state='SHOW_ALL', action) => {
	switch(action.type){
		case 'VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

export const isTodoLoading = (state=[], action) => {
	switch(action.type){
		case 'TODO_IS_LOADING':
			return action.isTodoLoading;
			
		default:
			return state;
	}
};