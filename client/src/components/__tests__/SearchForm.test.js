import { render, screen } from '@testing-library/react';
import SearchForm from '../SearchForm/SearchForm';

test('button text has correct initial color', () => {
	render(<SearchForm />);
	const searchBtn = screen.getByRole('button', { name: 'Search' });
	expect(searchBtn).toHaveStyle({ color: 'ButtonText' });
})