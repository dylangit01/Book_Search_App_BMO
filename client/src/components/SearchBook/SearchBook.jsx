import React, { useState } from 'react';
import styles from './SearchBook.module.css';
import SearchIsbn from '../SearchIsbn/SearchIsbn';

import { useDispatch } from 'react-redux';
import { getBookDetails } from '../../redux/actions/bookAction';
import BookDetails from '../BookDetails/BookDetails';
import SortBook from '../SortBooks/SortBooks';

const URL = 'http://openlibrary.org/search.json?q=';

const SearchBook = () => {
	const [books, setBooks] = useState([]);
	const [titleSortedBooks, setTitleSortedBooks] = useState([]);
	const [yearSortedBooks, setYearSortedBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState('');
	const [isbnQuery, setIsbnQuery] = useState('');
	const [changeSearch, setChangeSearch] = useState(true);

	const dispatch = useDispatch();

	const fetchBooks = async (e) => {
		e.preventDefault();
		setTitleSortedBooks([]);
		setYearSortedBooks([]);
		setBooks([]);
		setChangeSearch(true);
		setIsLoading(true);
		try {
			const res = await fetch(`${URL}${query}`);
			if (res.status === 500) {
				const err = new Error();
				err.message =
					"Sorry, Internal Server Error! There seems to be a problem with what you were just looking at. We've noted the error 2021-09-05/132912964475 and will look into it as soon as possible.";
				setError(err.message);
				setIsLoading(false);
				setQuery('');
				return;
			}
			const data = await res.json();
			
			if (data.docs.length === 0) {
				const err = new Error();
				err.message = 'No result, please try again';
				setError(err.message);
				setIsLoading(false);
				setQuery('');
				return;
			}

			setBooks(data.docs);
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
		setError(null);
		setChangeSearch(false);
		setIsLoading(true);
		const res = await fetch('http://localhost:5000/api/book', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({ isbnQuery }),
		});
		const { records } = await res.json();

		if (records === undefined) {
			const err = new Error();
			err.message = 'No result, please try again';
			setError(err.message);
			setIsLoading(false);
			setIsbnQuery('');
			return;
		}

		dispatch(getBookDetails(records));
		setIsLoading(false);
		setIsbnQuery('');
	};

	const sortByTitle = () => {
		setYearSortedBooks([]);
		setTitleSortedBooks(
			books.sort((a, b) => {
				if (a.title.toLowerCase() < b.title.toLowerCase()) {
					return -1;
				}
				if (a.title.toLowerCase() > b.title.toLowerCase()) {
					return 1;
				}
				return 0;
			})
		);
	};

	const sortByYear = () => {
		setYearSortedBooks(
			books
				.filter((book) => book.publish_year)
				.sort((a, b) => {
					return Number(b.publish_year[0]) - Number(a.publish_year[0]);
				})
		);
	};

	return (
		<>
			<form className={styles.form} onSubmit={fetchBooks}>
				<label htmlFor='query' className={styles.label}>
					BOOK TITLE:
				</label>
				<input
					required
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

			<SearchIsbn isbnQuery={isbnQuery} setIsbnQuery={setIsbnQuery} handleIsbnSearch={handleIsbnSearch} />

			{isLoading ? (
				<div className={styles.spinner} />
			) : (
				<>
					{changeSearch && books.length > 0 ? (
						<>
							{books.length > 0 && (
								<div className={styles.sortBtns}>
									<button className={styles.titleSortBtn} onClick={sortByTitle}>
										Sort by Title
									</button>
									<button className={styles.yearSortBtn} onClick={sortByYear}>
										Sort by Published Year
									</button>
								</div>
							)}

							{yearSortedBooks && <SortBook sortedBooks={yearSortedBooks} />}
							{titleSortedBooks && <SortBook sortedBooks={titleSortedBooks} />}
							<SortBook sortedBooks={books} />
						</>
					) : (
						<BookDetails error={error} />
					)}
					{error && books.length === 0 && <h1 className={styles.errorMsg}>{error}</h1>}
				</>
			)}
		</>
	);
};

export default SearchBook;
