import React from 'react';
import './App.css';
import SearchBook from './components/SearchBook/SearchBook';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BookDetail from './components/BookDetail/BookDetail';

function App() {
	return (
		<Router>
			<div className='container'>
				<h1 className='title'>Book Search</h1>
				<Switch>
					<Route exact path='/'>
						<SearchBook />
					</Route>
					<Route exact path='/book/isbn/:id'>
						<BookDetail />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
