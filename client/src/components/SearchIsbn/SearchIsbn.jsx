import React from 'react';
import styles from './SearchIsbn.module.css';


const IsbnForm = ({ isbnQuery, setIsbnQuery, handleIsbnSearch }) => {
	return (
		<form data-testid='isbn-form' className={styles.isbnArea} onSubmit={handleIsbnSearch}>
			<label data-testid='isbn-search-label' htmlFor='isbnQuery' className={styles.isbnLabel}>
				BOOK ISBN:
			</label>
			<input
				data-testid='isbn-search-input'
				required
				className={styles.queryInput}
				type='text'
				name='isbnQuery'
				placeholder='i.e. 9781442249073'
				value={isbnQuery}
				onChange={(e) => setIsbnQuery(e.target.value)}
			/>
			<button className={styles.isbnBtn}>Search</button>
		</form>
	);
};

export default IsbnForm;
