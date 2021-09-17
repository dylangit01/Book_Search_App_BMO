import React from 'react';
import styles from './BookDetails.module.css';
import { useSelector } from 'react-redux';

const BookDetails = () => {
	// Using redux selector to get bookDetails from store
	const { bookDetails } = useSelector((state) => state.bookState);
	const { error } = useSelector((state) => state.bookState);

	const imgSrc = `https://covers.openlibrary.org/b/isbn/${bookDetails?.isbns}-M.jpg`;

	return (
		<>
			{!error && Object.keys(bookDetails).length > 0 && (
				<>
					<h1>Book Details:</h1>
					<div data-testid='book-details' className={styles.card}>
						<img src={imgSrc} alt='bookDetailImg' />
						<div className={styles.cardContent}>
							<h3 className={styles.bookTitle}>Title: {bookDetails?.data?.title}</h3>
							<h3 className={styles.bookIsbn}>ISBN: {bookDetails?.isbns}</h3>
							<h3 className={styles.releaseDate}>Publish Date: {bookDetails?.publishDates}</h3>
							<h3 className={styles.bookAuthor}>
								Author:
								{bookDetails.data?.authors &&
									bookDetails.data?.authors.map((author, i) => (
										<div key={i}>
											<ul>
												<li>{author.name}</li>
											</ul>
										</div>
									))}
							</h3>
							<h3 className={styles.bookPages}>
								Number of Pages:&nbsp;
								{bookDetails.details?.details?.number_of_pages
									? bookDetails.details?.details?.number_of_pages
									: 'unknown'}
							</h3>
							<a className={styles.bookLink} target='_blank' rel='noreferrer' href={bookDetails.details?.info_url}>
								Book Info Link
							</a>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default BookDetails;
