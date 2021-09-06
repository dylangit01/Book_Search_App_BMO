import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBook from '../SearchBook/SearchBook';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../redux/reducers/index';

afterEach(cleanup);

const renderWithRedux = (
	component,
	{ initialState, store = createStore(reducers, compose(applyMiddleware(thunk))) } = {}
) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
	};
};

describe('SearchBook component', () => {
	it('renders with redux', () => {
		const { getByTestId } = renderWithRedux(<SearchBook />);
	});

	it('should render searchBook component', () => {
		renderWithRedux(<SearchBook />);
		const searchBookEl = screen.getByTestId('searchBook');
		expect(searchBookEl).toBeInTheDocument();
	});

	it('should display book search label', () => {
		renderWithRedux(<SearchBook />);
		const searchBookEl = screen.getByTestId('search-label');
		expect(searchBookEl).toHaveTextContent('BOOK TITLE');
	});
});
