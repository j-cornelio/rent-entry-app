import React      from 'react';
import Home       from './HomePage';
import Todos        from './TodosPage';

import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Sub = ({match}) => <h3>{match.params.data}</h3>

const Contact = ({match}) =>
  <div>
    <h1>Contact</h1>
    <h3>{match.params.page}</h3>

    <Link to='/contact/vlad'>vlad</Link>{' '}
    <Link to='/contact/julio'>julio</Link>

    <Route path='/contact/:data' component={Sub} />
  </div>

const App = () => (
  <Router>
    <div>
      <Link to='/'>Home</Link>{' '} | {' '}
      <Link to='/contact'>Contact</Link>{' '} | {' '}
      <Link to='/todos'>Todos</Link>
      <hr />
      <Route exact path='/'   component={Home} />
      <Route path='/contact'  component={Contact} />
      <Route path='/todos'      component={Todos} />
    </div>
  </Router>
)

export default App;
