import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './BookDetails.module.css';

const BookDetails = ({ error }) => {
	const [isbnTitle, setIsbnTitle] = useState('');
	const [authors, setAuthors] = useState([]);
	const [releaseDate, setReleaseDate] = useState(null);
	const [isbn, setIsbn] = useState('');
	const [pageNums, setPageNums] = useState(0);
	const [bookInfo, setBookInfo] = useState('');

	// Using redux selector to get data from backend
	const bookDetails = useSelector((state) => state.bookDetails);

	// Only when bookDetails has been updated from backend, update matched data
	useEffect(() => {
		if (bookDetails) {
			setIsbnTitle(bookDetails.data?.title);
			setAuthors(bookDetails.data?.authors);
			setReleaseDate(bookDetails.publishDates);
			setIsbn(bookDetails.isbns);
			setPageNums(bookDetails.details?.details?.number_of_pages);
			setBookInfo(bookDetails.details?.info_url);
		}
	}, [bookDetails]);

	return (
		<>
			{!error && Object.keys(bookDetails).length > 0 && (
				<div data-testid='book-details' className={styles.card}>
					<h1>Book Details:</h1>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Title: {isbnTitle}</h3>
						<h3 className={styles.cardTitle}>ISBN: {isbn && isbn[0]}</h3>
						<h3 className={styles.releaseDate}>Publish Date: {releaseDate}</h3>
						<h3 className={styles.cardAuthor}>
							Author:
							{authors &&
								authors.map((author, i) => (
									<div key={i}>
										<ul>
											<li>{author.name}</li>
										</ul>
									</div>
								))}
						</h3>
						<h3 className={styles.cardAuthor}>Number of Pages: {pageNums}</h3>
						<a target='_blank' rel='noreferrer' href={bookInfo}>
							Book Info Link
						</a>
					</div>
				</div>
			)}
		</>
	);
};

export default BookDetails;
