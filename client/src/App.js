import React from 'react';
import SearchBook from './components/SearchBook/SearchBook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reload from '../src/images/reload.png'

function App() {
	return (
		<Router>
			<div className='container'>
				<h1 onClick={() => window.location.reload()} className='title'>Online Book Search
				<img className="reload" src={reload} alt="reload" />
				</h1>
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
