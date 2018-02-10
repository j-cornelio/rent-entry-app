import React      from 'react';
import Fix      from '../components/fix/Fix';

const Home = ({match}) => 
  <div>
    <h1>Home</h1>
    <h3>{match.params.page}</h3>
    <Fix />
  </div>

export default Home;