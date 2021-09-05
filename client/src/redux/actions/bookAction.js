export const GET_BOOK_DETAILS = 'GET_BOOK_DETAILS';

export const getBookDetails = (data) => async (dispatch) => {
	try {
		dispatch({ type: GET_BOOK_DETAILS, payload: data });
	} catch (error) {
		console.log(error.message);
	}
}