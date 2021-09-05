import React from 'react';
import styles from './Card.module.css';

const Card = ({ book }) => {
	return (
		<>
			<div className={styles.card}>
				<h3 className={styles.cardTitle}>Title: {book.title}</h3>
				<div className={styles.cardContent}>
					<h2 className={styles.cardAuthor}>
						Author:
						{book.author_name &&
							book.author_name.map((name, i) => (
								<ul key={i}>
									<li>{name}</li>
								</ul>
							))}
					</h2>
					<div>
						<span className={styles.isbnLabel}>ISBN List:</span>
						<select className={styles.isbn}>
							{book.isbn &&
								book.isbn.map((isbnBook, i) => (
									<option key={i} value={isbnBook}>
										{isbnBook}
									</option>
								))}
						</select>
					</div>
				</div>
				
			</div>
		</>
	);
};

export default Card;
