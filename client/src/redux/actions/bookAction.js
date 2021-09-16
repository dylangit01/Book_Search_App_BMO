export const GET_BOOK_DETAILS = 'GET_BOOK_DETAILS';
export const GET_ALL_BOOKS = 'GET_ALL_BOOKS';
export const EMPTY_BOOKS = 'EMPTY_BOOKS';

export const getAllBooks = (data) => async (dispatch) => {
	try {
		dispatch({type: GET_ALL_BOOKS, payload: data})
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