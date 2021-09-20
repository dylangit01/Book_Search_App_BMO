import React from 'react';
import styles from './SearchForm.module.css';

const SearchForm = ({
	handleSubmit,
	formTestId = '',
	labelTestId = '',
	inputTestId = '',
	btnTestId = '',
	name,
	text,
	placeholder,
	value,
	handleChange,
}) => {
	return (
		<form data-testid={formTestId} className={styles.formArea} onSubmit={handleSubmit}>
			<label aria-required='true' data-testid={labelTestId} htmlFor={name} className={styles.formLabel}>
				{text}
			</label>
			<input
				role='search'
				data-testid={inputTestId}
				required
				className={styles.queryInput}
				type='search'
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
			/>
			<button data-testid={btnTestId} className={styles.formBtn}>
				Search
			</button>
		</form>
	);
};

export default SearchForm;
