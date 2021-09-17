import React, { useState, useEffect } from 'react';
import styles from './SearchBook.module.css';
import SearchForm from '../SearchForm/SearchForm';
import { sortByTitleFun, sortByYearFun } from '../../Help/helpFuncs';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllBooks,
	getBookDetails,
	getBooksByAuthor,
	removeBooksResult,
	showErrorMsg,
	emptyErrorMsg,
	titleSortedBooks,
	yearSortedBooks,
} from '../../redux/actions/bookAction';
import BookDetails from '../BookDetails/BookDetails';
import SortBook from '../SortBooks/SortBooks';
import goTop from '../../images/go-top.png';

// const localServer = 'http://localhost:5000/api/books';
const herokuServerURL = 'https://book-seach-master.herokuapp.com/api/books';

const SearchBook = ({ handleScrollUp }) => {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [isbnQuery, setIsbnQuery] = useState('');
	const [authorQuery, setAuthorQuery] = useState('');
	const [searchType, setSearchType] = useState(null);
	const [showLoader, setShowLoader] = useState(false);
	const [showGoTop, setShowGoTop] = useState(false);
	const [bookNum, setBookNum] = useState(5);

	const { books } = useSelector((state) => state.bookState);
	const { error } = useSelector((state) => state.bookState);

	const clearInput = () => {
		setIsLoading(false);
		setQuery('');
		setIsbnQuery('');
		setAuthorQuery('');
	};

	const fetchBooks = async (e) => {
		e.preventDefault();

		dispatch(removeBooksResult());
		setBookNum(5);
		setSearchType('title');
		setIsLoading(true);
		try {
			const res = await fetch(herokuServerURL, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ query }),
			});

			if (res.status === 500) {
				clearInput();
				throw new Error(
					"Sorry, Internal Server Error! There seems to be a problem with what you were just looking at. We've noted the error and will look into it as soon as possible."
				);
			}
			if (res.status === 404) {
				clearInput();
				throw new Error('Please make sure search URL is correct');
			}
			const data = await res.json();
			if (data.docs.length === 0) {
				clearInput();
				throw new Error('No result, please try again');
			}

			dispatch(getAllBooks(data.docs));
			clearInput();
		} catch (e) {
			dispatch(showErrorMsg(e.message));
		}
	};

	// Get books by searching author's name:
	const fetchBooksByAuthor = async (e) => {
		e.preventDefault();

		dispatch(removeBooksResult());
		setBookNum(5);
		setSearchType('author');
		setIsLoading(true);
		const bookAuthorEndPoint = `${herokuServerURL}/authors`;
		try {
			const res = await fetch(bookAuthorEndPoint, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ authorQuery }),
			});

			if (res.status === 500) {
				clearInput();
				throw new Error('No result, please try again');
			}
			const data = await res.json();
			if (data.docs.length === 0) {
				clearInput();
				throw new Error('No result, please try again');
			}

			dispatch(getBooksByAuthor(data.docs));
			clearInput();
		} catch (e) {
			dispatch(showErrorMsg(e.message));
		}
	};

	// Build Backend API for Isbn Search because of CORS error
	// Create Redux to handle async issue when fetching response from backend
	const fetchBookDetails = async (e) => {
		e.preventDefault();

		dispatch(emptyErrorMsg());
		setSearchType('details');
		setIsLoading(true);
		const bookDetailsEndPoint = `${herokuServerURL}/bookdetails`;
		try {
			const res = await fetch(bookDetailsEndPoint, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ isbnQuery }),
			});
			const { records } = await res.json();
			if (records === undefined) {
				clearInput();
				dispatch(removeBooksResult());
				throw new Error('No result, please try again');
			}

			dispatch(getBookDetails(records));
			clearInput();
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

	// Create load more event
	useEffect(() => {
		const handleScroll = () => {
			const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
			if (scrollTop + clientHeight >= scrollHeight - 5) {
				setShowLoader(true);
				setTimeout(() => {
					setBookNum((preValue) => preValue + 5);
					setShowLoader(false);
				}, 500);
			}
			if (scrollTop >= clientHeight) {
				setShowGoTop(true);
			} else {
				setShowGoTop(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			<SearchForm
				formTestId='searchBook'
				labelTestId='search-label'
				inputTestId='search-input'
				btnTestId='title-button'
				handleSubmit={fetchBooks}
				name='query'
				text='BOOK TITLE:'
				placeholder='i.e. The Great Gatsby'
				value={query}
				handleChange={(e) => setQuery(e.target.value)}
			/>

			<SearchForm
				formTestId='isbn-form'
				labelTestId='isbn-search-label'
				inputTestId='isbn-search-input'
				btnTestId='isbn-button'
				handleSubmit={fetchBookDetails}
				name='isbnQuery'
				text='BOOK ISBN:'
				placeholder='i.e. 9781442249073'
				value={isbnQuery}
				handleChange={(e) => setIsbnQuery(e.target.value)}
			/>

			<SearchForm
				handleSubmit={fetchBooksByAuthor}
				name='authorQuery'
				text='BOOK AUTHOR:'
				placeholder='i.e. J. K. Rowling'
				value={authorQuery}
				handleChange={(e) => setAuthorQuery(e.target.value)}
			/>

			{isLoading ? (
				<div data-testid='search-loading' className={styles.spinner} />
			) : (
				<>
					{searchType === 'title' && books.length > 0 && (
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
							<SortBook data-testid='search-result' bookNum={bookNum} />
						</>
					)}
					{searchType === 'author' && books.length > 0 && <SortBook bookNum={bookNum} />}
					{searchType === 'details' && <BookDetails />}
					{error && books.length === 0 && <h1 className={styles.errorMsg}>{error}</h1>}
				</>
			)}
			<div className={`${styles.pageLoader} ${showLoader && styles.show}`}>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
				<div className={styles.circle}></div>
			</div>
			<img className={`${styles.goTop} ${showGoTop && styles.show}`} src={goTop} alt='goTop' onClick={handleScrollUp} />
		</>
	);
};

export default SearchBook;
