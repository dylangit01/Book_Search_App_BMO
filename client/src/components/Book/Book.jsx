import React from 'react';
import styles from './Book.module.css'

const Book = ({ book, number }) => {

	return (
		<>
			<div className={styles.card}>
			<div className={styles.bookNumber}>{number}</div>
				<div className={styles.cardContent}>
					<div>
						<h3 data-testid='book-title' className={styles.cardTitle}>
							Title: {book.title}
						</h3>
						<h3 data-testid='book-author' className={styles.cardAuthor}>
							Author:
							{book.author_name &&
								book.author_name.map((name, i) => (
									<ul key={i}>
										<li>{name}</li>
									</ul>
								))}
						</h3>
						<span className={styles.pubDateLabel}>Publish Date: </span>
						<select data-testid='book-publish-date' className={styles.publish}>
							{book.publish_date &&
								book.publish_date.map((pubDate, i) => (
									<option key={i} value={pubDate}>
										{pubDate}
									</option>
								))}
						</select>
					</div>
					{book.cover_i ? (
						<img
							data-testid='book-cover'
							className={styles.bookImg}
							src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
							alt='booKImg'
						/>
					) : (
						<img
							className={styles.bookImg}
							src='https://cdn.pixabay.com/photo/2018/01/03/09/09/book-3057901_640.png'
							alt='BookImgAlt'
						/>
					)}
				</div>
			</div>
		</>
	);
};

export default Book;
