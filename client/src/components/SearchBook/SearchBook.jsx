import React, { useState, useEffect } from 'react';
import styles from './SearchBook.module.css';
import Card from '../Card/Card';
import IsbnForm from '../IsbnForm/IsbnForm';

import { useDispatch } from 'react-redux';
import { getBookDetails } from '../../redux/actions/bookAction';

const URL = 'http://openlibrary.org/search.json?q=';

const SearchBook = () => {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState('');
	const [isbnQuery, setIsbnQuery] = useState('');

	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState([]);
	const [bookCover, setBookCover] = useState('');
	const [releaseDate, setReleaseDate] = useState(null);
	const [OLID, setOLID] = useState('')
	const [bookDetails, setBookDetails] = useState({})

	const dispatch = useDispatch();

	const fetchBooks = async (e) => {
		e.preventDefault();

		setIsLoading(true);
		try {
			const res = await fetch(`${URL}${query}`);
			const data = await res.json();

			setBooks(data.docs);
			console.log(data.docs);
			setIsLoading(false);
			setQuery('');
		} catch (e) {
			setIsLoading(true);
			setError(e.message);
			setIsLoading(false);
		}
	};

	const handleIsbnSearch = async (e) => {
		e.preventDefault();

		const isbnInput = new FormData(e.target);
		const payload = Object.fromEntries(isbnInput.entries());

		const res = await fetch('http://localhost:5000/api/book', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(payload),
		});
		const { records } = await res.json();
		dispatch(getBookDetails(records));
		
		// setBookDetails(Object.values(data.records)[0]);
		// setReleaseDate(bookDetails.publishDates);
	};

	// useEffect(() => {
	// 	console.log(bookDetails);
	// 	console.log(releaseDate);
	// }, [bookDetails, releaseDate]);

	// if (error)
	// 	return (
	// 		<>
	// 			<h2>Network error: {error}, please try later.</h2>
	// 			<Link to='/'>
	// 				<button className={styles.backBtn}>Back</button>
	// 			</Link>

	// 		</>
	// 	);

	return (
		<>
			<form className={styles.form} onSubmit={fetchBooks}>
				<label htmlFor='query' className={styles.label}>
					BOOK TITLE:
				</label>
				<input
					className={styles.queryInput}
					type='text'
					name='query'
					placeholder='i.e. The Great Gatsby'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button className={styles.searchBtn} type='submit'>
					Search
				</button>
			</form>

			<IsbnForm isbnQuery={isbnQuery} setIsbnQuery={setIsbnQuery} handleIsbnSearch={handleIsbnSearch} />

			<div style={{fontSize: '2rem'}}>
			<pre>details: {JSON.stringify(bookDetails, '', 3)}</pre>
			</div>

			{/* <h3>title:{title}</h3>
			<h3>Author: {author}</h3>
			<h3>BookCover: {bookCover}</h3> */}
			<h3>ReleaseDate:{releaseDate}</h3>


			{isLoading ? (
				<h1>Searing...</h1>
			) : (
				<div className={styles.bookList}>
					{books.map((book) => (
						<Card key={book.key} book={book} />
					))}
				</div>
			)}
		</>
	);
};

export default SearchBook;
