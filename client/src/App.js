import React from 'react';
import SearchBook from './components/SearchBook/SearchBook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='container'>
				<h1 className='title'>Book Search</h1>
				<Switch>
					<Route exact path='/'>
						<SearchBook />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
