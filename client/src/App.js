import React from 'react';
import SearchBook from './components/SearchBook/SearchBook';
import reload from '../src/images/reload.png';

function App() {
	return (
		<div className='container'>
			<h1 onClick={() => window.location.reload()} className='title'>
				Book Search Master
				<img className='reload' src={reload} alt='reload' />
			</h1>
			<SearchBook />
		</div>
	);
}

export default App;
