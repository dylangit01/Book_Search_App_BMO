import React from 'react';
import Book from '../Book/Book';
import styles from './SortBooks.module.css';
import { useSelector } from 'react-redux';

const SortBook = () => {
	const { books } = useSelector((state) => state.bookState);
	return (
		<div className={styles.bookList}>
			{books.map((book, index) => (
				<Book key={book.key} book={book} number={index+1} />
			))}
		</div>
	);
};

export default SortBook;
