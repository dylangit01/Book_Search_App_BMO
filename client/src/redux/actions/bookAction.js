export const GET_BOOK_DETAILS = 'GET_BOOK_DETAILS';
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
export const EMPTY_BOOKS = 'EMPTY_BOOKS';
export const ERROR = 'ERROR'
export const EMPTY_ERROR = 'EMPTY_ERROR';
export const TITLE_SORTED_BOOKS = 'TITLE_SORTED_BOOKS'
export const YEAR_SORTED_BOOKS = 'YEAR_SORTED_BOOKS';
export const GET_BOOK_BY_AUTHOR = 'GET_BOOK_BY_AUTHOR';

export const getAllBooks = (data) => async (dispatch) => {
	try {
		dispatch({type: GET_ALL_BOOKS, payload: data})
	} catch (error) {
		console.log(error.message);
	}
}

export const getBooksByAuthor = (data) => async (dispatch) => {
	try {
		dispatch({type: GET_BOOK_BY_AUTHOR, payload: data})
	} catch (error) {
		console.log(error.message);
	}
}

export const getBookDetails = (data) => async (dispatch) => {
	try {
		dispatch({ type: GET_BOOK_DETAILS, payload: data });
	} catch (error) {
		console.log(error.message);
	}
}

export const removeBooksResult = () => async (dispatch) => {
	try {
		dispatch({ type: EMPTY_BOOKS, payload: [] });
	} catch (error) {
		console.log(error.message);
	}
}

export const showErrorMsg = (errorMsg) => async (dispatch) => {
	try {
		dispatch({ type: ERROR, payload: errorMsg });
	} catch (error) {
		console.log(error.message);
	}
}

export const emptyErrorMsg = () => async (dispatch) => {
	try {
		dispatch({type: EMPTY_ERROR, payload: null})
	} catch (error) {
		console.log(error.message);
	}
}

export const titleSortedBooks = (books) => async (dispatch) => {
	try {
		dispatch({type: TITLE_SORTED_BOOKS, payload:books})
	} catch (error) {
		console.log(error.message);
	}
}

export const yearSortedBooks = (books) => async (dispatch) => {
	try {
		dispatch({ type: YEAR_SORTED_BOOKS, payload: books });
	} catch (error) {
		console.log(error.message);
	}
};