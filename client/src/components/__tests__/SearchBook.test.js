import { render, screen, cleanup, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBook from '../SearchBook/SearchBook';
import SortBook from '../SortBooks/SortBooks';

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

	it('should render input', () => {
		renderWithRedux(<SearchBook />);
		const inputEl = screen.getByTestId('search-input');
		expect(inputEl).toBeTruthy();
	});

	it('should not render loading state initially', () => {
		renderWithRedux(<SearchBook />);
		const loadingEl = screen.queryByTestId('search-loading');
		expect(loadingEl).toBeFalsy();
	});

	// it('should render loading state when fetching data', async () => {
	// 	await act( async () => {
	// 		renderWithRedux(<SearchBook />);
	// 		const loadingEl = screen.queryByTestId('search-loading');
	// 		const searchBtn = screen.getByTestId('title-button');
	// 		// const sortBook = screen.queryByTestId('search-loading')
	// 		await fireEvent.click(searchBtn)

	// 		expect(loadingEl).toBeTruthy();
	// 	});
	// });
});
