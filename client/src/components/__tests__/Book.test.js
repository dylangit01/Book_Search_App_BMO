import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Book from '../Book/Book';

afterEach(cleanup);

describe('Book component', () => {
	it('should display book search result', async () => {
		const book = { title: 'test book', author: ['book author'], publish_date: ['2021']};
		render(<Book book={book} />);
		const bookTitle = screen.getByTestId('book-title');
		const bookAuthor = screen.getByTestId('book-author');
		const bookPublishDate = screen.getByTestId('book-publish-date');

		expect(bookTitle).toBeInTheDocument();
		expect(bookTitle).toHaveTextContent('Title: test book');
		expect(bookAuthor).toBeInTheDocument();
		expect(bookAuthor).toHaveTextContent('Author:');
		expect(bookPublishDate).toBeInTheDocument();
		expect(bookPublishDate).toHaveTextContent('2021');
	});
});
