import React      from 'react';
import Todos      from '../components/todo/Todos';

const TodosPage = ({match}) => 
  <div>
    <h1>Todos</h1>
    <h3>{match.params.page}</h3>
    <Todos />
  </div>

export default TodosPage;