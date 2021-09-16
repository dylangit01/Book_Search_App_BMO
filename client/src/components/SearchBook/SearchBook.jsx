import React, { useState } from 'react';
import styles from './SearchBook.module.css';
import SearchIsbn from '../SearchIsbn/SearchIsbn';
import { sortByTitleFun } from '../Help/helpFuncs';

import { useDispatch } from 'react-redux';
import { getAllBooks, getBookDetails } from '../../redux/actions/bookAction';
import BookDetails from '../BookDetails/BookDetails';
import SortBook from '../SortBooks/SortBooks';

import { useSelector } from 'react-redux';

const URL = 'https://openlibrary.org/search.json?q=';

const SearchBook = () => {
	// const [books, setBooks] = useState([]);
	const [titleSortedBooks, setTitleSortedBooks] = useState([]);
	const [yearSortedBooks, setYearSortedBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [query, setQuery] = useState('');
	const [isbnQuery, setIsbnQuery] = useState('');
	const [changeSearch, setChangeSearch] = useState(true);

	const dispatch = useDispatch();

	const { books } = useSelector(state => state.bookState)

	const fetchBooks = async (e) => {
		e.preventDefault();

		setTitleSortedBooks([]);
		setYearSortedBooks([]);
		// setBooks([]);
		setChangeSearch(true);
		setIsLoading(true);
		try {
			const res = await fetch(`${URL}${query}`);
			if (res.status === 500) {
				setIsLoading(false);
				setQuery('');
				throw new Error(
					"Sorry, Internal Server Error! There seems to be a problem with what you were just looking at. We've noted the error and will look into it as soon as possible."
				);
			}
			if (res.status === 404) {
				setIsLoading(false);
				setQuery('');
				throw new Error('Please make sure search URL is correct');
			}
			const data = await res.json();
			if (data.docs.length === 0) {
				setIsLoading(false);
				setQuery('');
				throw new Error('No result, please try again');
			}

			dispatch(getAllBooks(data.docs));
			setIsLoading(false);
			setQuery('');
		} catch (e) {
			setError(e.message);
		}
	};

	// Build Backend API for Isbn Search because of CORS error
	// Create Redux to handle async issue when fetching response from backend
	const handleIsbnSearch = async (e) => {
		e.preventDefault();
		setError(null);
		setChangeSearch(false);
		setIsLoading(true);
		// const localServer = 'http://localhost:5000/api/book';
		const herokuServerURL = 'https://book-seach-master.herokuapp.com/api/book';
		try {
			const res = await fetch(herokuServerURL, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ isbnQuery }),
			});
			const { records } = await res.json();

			if (records === undefined) {
				setIsLoading(false);
				setQuery('');
				setIsbnQuery('');
				// setBooks([]);
				throw new Error('No result, please try again');
			}

			dispatch(getBookDetails(records));
			setIsLoading(false);
			setIsbnQuery('');
		} catch (error) {
			setError(error.message)
		}
	};

	const sortByTitle = () => {
		setYearSortedBooks([]);
		setTitleSortedBooks(sortByTitleFun(books));
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
			<form data-testid='searchBook' className={styles.form} onSubmit={fetchBooks}>
				<label data-testid='search-label' htmlFor='query' className={styles.label}>
					BOOK TITLE:
				</label>
				<input
					data-testid='search-input'
					required
					className={styles.queryInput}
					type='text'
					name='query'
					placeholder='i.e. The Great Gatsby'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<button data-testid='title-button' className={styles.searchBtn} type='submit'>
					Search
				</button>
			</form>

			<SearchIsbn isbnQuery={isbnQuery} setIsbnQuery={setIsbnQuery} handleIsbnSearch={handleIsbnSearch} />

			{isLoading ? (
				<div data-testid='search-loading' className={styles.spinner} />
			) : (
				<>
					{changeSearch && books.length > 0 ? (
						<>
							{books.length > 0 && (
								<div className={styles.sortBtns}>
									<button className={styles.titleSortBtn} onClick={sortByTitle}>
										Sort by Title (alphabetically )
									</button>
									<button className={styles.yearSortBtn} onClick={sortByYear}>
										Sort by most recently Published Year
									</button>
								</div>
							)}

							{yearSortedBooks && <SortBook sortedBooks={yearSortedBooks} />}
							{titleSortedBooks && <SortBook sortedBooks={titleSortedBooks} />}
							<SortBook data-testid='search-result' sortedBooks={books} />
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
