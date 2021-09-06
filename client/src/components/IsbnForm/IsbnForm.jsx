import React from 'react';
import styles from './IsbnForm.module.css';


const IsbnForm = ({ isbnQuery, setIsbnQuery, handleIsbnSearch }) => {
	return (
		<form className={styles.isbnArea} onSubmit={handleIsbnSearch}>
			<label htmlFor='isbnQuery' className={styles.isbnLabel}>
				BOOK ISBN:
			</label>
			<input
				required
				className={styles.queryInput}
				type='text'
				name='isbnQuery'
				placeholder='i.e. 9781442249073'
				value={isbnQuery}
				onChange={(e) => setIsbnQuery(e.target.value)}
			/>
			{/* <Link to={`/book/isbn/${isbnQuery}`}> */}
			<button className={styles.isbnBtn}>ISBN Search</button>
			{/* </Link> */}
		</form>
	);
};

export default IsbnForm;
