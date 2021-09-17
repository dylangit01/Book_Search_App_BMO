import React, {useRef} from 'react';
import SearchBook from './components/SearchBook/SearchBook';
import reload from '../src/images/reload.png';

function App() {

	const refScrollUp = useRef();

	const handleScrollUp = () => {
		refScrollUp.current.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='container' ref={refScrollUp}>
			<h1 onClick={() => window.location.reload()} className='title'>
				Book Search Master
				<img className='reload' src={reload} alt='reload' />
			</h1>
			<SearchBook handleScrollUp={handleScrollUp} />
		</div>
	);
}

export default App;
