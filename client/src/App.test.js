import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './redux/reducers';

const renderWithRedux = (
	component,
	{ initialState, store = createStore(reducers, compose(applyMiddleware(thunk))) } = {}
) => {
	return {
		...render(<Provider store={store}>{component}</Provider>),
	};
};

test('renders App component', () => {
	renderWithRedux(<App />);
	// const linkElement = screen.getByText(/Book Search Master/i);
	const linkElement = screen.getByRole('heading', { name: /Book Search Master/i });
	expect(linkElement).toBeInTheDocument();
	expect(linkElement.textContent).toBe('Book Search Master');
});
