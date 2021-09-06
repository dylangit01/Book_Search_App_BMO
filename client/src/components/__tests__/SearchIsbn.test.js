import { render, screen, cleanup, } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchIsbn from '../SearchIsbn/SearchIsbn'

afterEach(cleanup);

describe('SearchIsbn component', () => {
	it('should render with redux', () => {
		render(<SearchIsbn />);
	});

	// it('should render searchBook component', () => {
	// 	render(<SearchIsbn />);
	// 	const searchBookEl = screen.getByTestId('searchBook');
	// 	expect(searchBookEl).toBeInTheDocument();
	// });

	// it('should display book search label', () => {
	// 	render(<SearchIsbn />);
	// 	const searchBookEl = screen.getByTestId('search-label');
	// 	expect(searchBookEl).toHaveTextContent('BOOK TITLE');
	// });

	// it('should render input', () => {
	// 	render(<SearchIsbn />);
	// 	const inputEl = screen.getByTestId('search-input');
	// 	expect(inputEl).toBeTruthy();
	// });

	// it('should not render loading state initially', () => {
	// 	render(<SearchIsbn />);
	// 	const loadingEl = screen.queryByTestId('search-loading');
	// 	expect(loadingEl).toBeFalsy();
	// });
});
