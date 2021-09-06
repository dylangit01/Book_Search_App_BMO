import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom"
import SearchBook from '../SearchBook/SearchBook';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../redux/reducers/index';

afterEach(cleanup);

const renderWithRedux = (component, { initialState, store = createStore(reducers, initialState)} ={} ) => {
	return {
		...render(<Provider store={store}>{component}</Provider>)
	}
}

it('renders with redux', () => {
	const { getByTestId, getByText } = renderWithRedux(<SearchBook />);
})



// test('should render SearchBook component', () => {
// 	render(<SearchBook />);
// 	const searchBookEl = screen.getByTestId('searchBook-1');
// 	expect(searchBookEl).toBeInTheDocument();
// });
