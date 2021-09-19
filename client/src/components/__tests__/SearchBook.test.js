import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
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
	
	it('should render with redux', () => {
		renderWithRedux(<SearchBook />);
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

	it('should render search book input', () => {
		renderWithRedux(<SearchBook />);
		const inputEl = screen.getByTestId('search-input');
		expect(inputEl).toBeTruthy();
	});

	it('should not render loading state initially', () => {
		renderWithRedux(<SearchBook />);
		const loadingEl = screen.queryByTestId('search-loading');
		expect(loadingEl).toBeFalsy();
	});

	it('should render ISBN search form', () => {
		renderWithRedux(<SearchBook />);
		const isbnForm = screen.getByTestId('isbn-form');
		expect(isbnForm).toBeInTheDocument();
	});

	it('should display ISBN search label', () => {
		renderWithRedux(<SearchBook />);
		const searchBookEl = screen.getByTestId('isbn-search-label');
		expect(searchBookEl).toHaveTextContent('BOOK ISBN');
	});

	it('should render ISBN search input', () => {
		renderWithRedux(<SearchBook />);
		const inputEl = screen.getByTestId('isbn-search-input');
		expect(inputEl).toBeTruthy();
	});
});
