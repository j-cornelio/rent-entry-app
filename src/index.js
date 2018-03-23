import React 					from 'react';
import ReactDOM 				from 'react-dom';
import App 						from './containers/App';
import configureStore 			from './store/configureStore';
import { Provider } 			from 'react-redux';
import registerServiceWorker 	from './registerServiceWorker';
// eslint-disable-next-line
import styles 					from './css/styles.css';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
);

registerServiceWorker();
