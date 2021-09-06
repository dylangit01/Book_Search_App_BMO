import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './BookDetail.module.css';

const BookDetail = ({ error }) => {
	const [isbnTitle, setIsbnTitle] = useState('');
	const [authors, setAuthors] = useState([]);
	const [releaseDate, setReleaseDate] = useState(null);
	const [isbn, setIsbn] = useState('');

	const bookDetails = useSelector((state) => state.bookDetails);

	useEffect(() => {
		if (bookDetails) {
			setIsbnTitle(bookDetails.data?.title);
			setAuthors(bookDetails.data?.authors);
			setReleaseDate(bookDetails.publishDates);
			setIsbn(bookDetails.isbns);
		}
	}, [bookDetails]);

	return (
		<>
			{!error && Object.keys(bookDetails).length > 0 && (
				<div className={styles.card}>
					<div className={styles.cardContent}>
						<h3 className={styles.cardTitle}>Title: {isbnTitle}</h3>
						<h3 className={styles.cardTitle}>ISBN: {isbn && isbn[0]}</h3>
						<h2 className={styles.cardAuthor}>
							Author:
							{authors &&
								authors.map((author, i) => (
									<div key={i}>
										<ul>
											<li>{author.name}</li>
										</ul>
										<a target='_blank' rel='noreferrer' href={author.url}>
											{author.url}
										</a>
									</div>
								))}
						</h2>
						<h2 className={styles.cardAuthor}>Publish Date: {releaseDate}</h2>
					</div>
				</div>
			)}
		</>
	);
};

export default BookDetail;
