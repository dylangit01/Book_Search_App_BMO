import { GET_ALL_BOOKS, GET_BOOK_DETAILS } from '../actions/bookAction';

const book = (state = { books: [], bookDetails: {} }, action) => {
	switch (action.type) {
		case GET_ALL_BOOKS:
			return { ...state, books: action.payload };
		case GET_BOOK_DETAILS:
			return { ...state, bookDetails: Object.values(action.payload)[0] };
		default:
			return state;
	}
};

export default book;
