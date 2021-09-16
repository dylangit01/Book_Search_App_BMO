import React, { useState } from 'react';
import styles from './SearchBook.module.css';
import SearchIsbn from '../SearchIsbn/SearchIsbn';
import { sortByTitleFun, sortByYearFun, fetchDataFun } from '../Help/helpFuncs';
import { useDispatch } from 'react-redux';
import {
	getAllBooks,
	getBookDetails,
	removeBooksResult,
	showErrorMsg,
	emptyErrorMsg,
	titleSortedBooks,
	yearSortedBooks,
} from '../../redux/actions/bookAction';
import BookDetails from '../BookDetails/BookDetails';
import SortBook from '../SortBooks/SortBooks';
import { useSelector } from 'react-redux';

// const localServer = 'http://localhost:5000/api/books';
const herokuServerURL = 'https://book-seach-master.herokuapp.com/api/books';

const SearchBook = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [isbnQuery, setIsbnQuery] = useState('');
	const [changeSearch, setChangeSearch] = useState(true);

	const dispatch = useDispatch();

	const { books } = useSelector((state) => state.bookState);
	const { error } = useSelector((state) => state.bookState);

	const fetchBooks = async (e) => {
		e.preventDefault();

		dispatch(removeBooksResult());
		setChangeSearch(true);
		setIsLoading(true);
		try {
			const res = await fetchDataFun(herokuServerURL, query)

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
			dispatch(showErrorMsg(e.message));
		}
	};

	// Build Backend API for Isbn Search because of CORS error
	// Create Redux to handle async issue when fetching response from backend
	const handleIsbnSearch = async (e) => {
		e.preventDefault();
		dispatch(emptyErrorMsg());
		setChangeSearch(false);
		setIsLoading(true);
		const bookDetailsEndPoint = `${herokuServerURL}/bookdetails`;
		try {
			const res = await fetchDataFun(bookDetailsEndPoint, isbnQuery)
			const { records } = await res.json();

			if (records === undefined) {
				setIsLoading(false);
				setQuery('');
				setIsbnQuery('');
				dispatch(removeBooksResult());
				throw new Error('No result, please try again');
			}

			dispatch(getBookDetails(records));
			setIsLoading(false);
			setIsbnQuery('');
		} catch (e) {
			dispatch(showErrorMsg(e.message));
		}
	};

	const sortByTitle = () => {
		dispatch(titleSortedBooks(sortByTitleFun(books)));
	};

	const sortByYear = () => {
		dispatch(yearSortedBooks(sortByYearFun(books)));
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
							{/* By using redux to filter the title and year, no need to create separate components for titleSortedBooks and yearSortedBooks, one SortBook component with useSelector solve all filter conditions */}
							{<SortBook />}
						</>
					) : (
						<BookDetails />
					)}
					{error && books.length === 0 && <h1 className={styles.errorMsg}>{error}</h1>}
				</>
			)}
		</>
	);
};

export default SearchBook;
