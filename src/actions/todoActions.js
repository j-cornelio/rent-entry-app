
export const addTodo = (text, id) => {
  return {
    type    : 'ADD_TODO',
    text,
    id
  }
};

export const toggleTodo = (id) => {
  return {
    type    : 'TOGGLE_TODO',
    id
  }
};

export const visibility = (filter) => {
  return {
    type    : 'VISIBILITY_FILTER',
    filter
  }
};