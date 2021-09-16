import React from 'react';
import Book from '../Book/Book';
import styles from './SortBooks.module.css';
import { useSelector } from 'react-redux';

const SortBook = () => {
	const { books } = useSelector((state) => state.bookState);
	return (
		<div className={styles.bookList}>
			{books.map((book) => (
				<Book key={book.key} book={book} />
			))}
		</div>
	);
};

export default SortBook;
