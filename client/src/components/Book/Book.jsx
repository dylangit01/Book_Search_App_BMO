import React from 'react';
import styles from './Book.module.css';

const Book = ({ book, number }) => {
	return (
		<>
			<div className={styles.card}>
				<div className={styles.bookNumber}>{number}</div>
				<div className={styles.cardContent}>
					<div>
						<h3 data-testid='book-title' className={styles.cardTitle}>
							{book.title && 'Title:'} {book.title}
							{book.top_work && 'Top Work:'} {book.top_work}
						</h3>
						<h3 data-testid='book-author' className={styles.cardAuthor}>
							Author: &nbsp;
							{(book.author_name &&
								book.author_name.map((name, i) => (
									<ul key={i}>
										<li>{name}</li>
									</ul>
								))) || 
								book.name}
						</h3>
						{book.publish_date && (
							<>
								<span className={styles.pubDateLabel}>Publish Date: </span>
								<select data-testid='book-publish-date' className={styles.publish}>
									{book.publish_date &&
										book.publish_date.map((pubDate, i) => (
											<option key={i} value={pubDate}>
												{pubDate}
											</option>
										))}
								</select>
							</>
						)}

						{book.top_subjects && (
							<>
								<span className={styles.pubDateLabel}>Top Subjects: </span>
								<select data-testid='book-publish-date' className={styles.publish}>
									{book.top_subjects &&
										book.top_subjects.map((subject, i) => (
											<option key={i} value={subject}>
												{subject}
											</option>
										))}
								</select>
							</>
						)}
					</div>
					{book.cover_i || book.top_work ? (
						<img
							data-testid='book-cover'
							className={styles.bookImg}
							src={
								(book.cover_i && `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`) ||
								(book.top_work && `http://covers.openlibrary.org/a/olid/${book.key}-M.jpg`)
							}
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
