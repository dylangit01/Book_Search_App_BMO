import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Book from '../Book/Book';

describe('Book component', () => {
	it('should not render when no content', async () => {
		const book = { title: 'test book', author: ['book author'], publish_date: ['2021'], cover_i: 123456};
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
