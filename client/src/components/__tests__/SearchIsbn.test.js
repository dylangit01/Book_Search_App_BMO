import { render, screen, cleanup, } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchIsbn from '../SearchIsbn/SearchIsbn'

afterEach(cleanup);

describe('SearchIsbn component', () => {
	it('should render SearchIsbn component', () => {
		render(<SearchIsbn />);
		const isbnForm = screen.getByTestId('isbn-form');
		expect(isbnForm).toBeInTheDocument();
	});

	it('should display book search label', () => {
		render(<SearchIsbn />);
		const searchBookEl = screen.getByTestId('isbn-search-label');
		expect(searchBookEl).toHaveTextContent('BOOK ISBN');
	});

	it('should render input', () => {
		render(<SearchIsbn />);
		const inputEl = screen.getByTestId('isbn-search-input');
		expect(inputEl).toBeTruthy();
	});
});
