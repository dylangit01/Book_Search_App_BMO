import React from 'react'
import Book from '../Book/Book';
import styles from './SortBooks.module.css'

const SortBook = ({ sortedBooks }) => {
	return (
		<div className={styles.bookList}>
			{sortedBooks.map((book) => (
				<Book key={book.key} book={book} />
			))}
		</div>
	);
};

export default SortBook
