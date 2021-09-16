import { GET_ALL_BOOKS, GET_BOOK_DETAILS, EMPTY_BOOKS } from '../actions/bookAction';

const book = (state = { books: [], bookDetails: {} }, action) => {
	switch (action.type) {
		case GET_ALL_BOOKS:
			return { ...state, books: action.payload };
		case GET_BOOK_DETAILS:
			return { ...state, bookDetails: Object.values(action.payload)[0] };
		case EMPTY_BOOKS:
			return { ...state, books:action.payload}
		default:
			return state;
	}
};

export default book;
