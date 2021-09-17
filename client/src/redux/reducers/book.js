import {
	GET_ALL_BOOKS,
	GET_BOOK_DETAILS,
	EMPTY_BOOKS,
	ERROR,
	EMPTY_ERROR,
	TITLE_SORTED_BOOKS,
	YEAR_SORTED_BOOKS,
	GET_BOOK_BY_AUTHOR,
} from '../actions/bookAction';

const book = (state = { books: [], bookDetails: {}, error: null }, action) => {
	switch (action.type) {
		case GET_ALL_BOOKS:
		case EMPTY_BOOKS:
		case TITLE_SORTED_BOOKS:
		case YEAR_SORTED_BOOKS:
		case GET_BOOK_BY_AUTHOR:
			return { ...state, books: action.payload };
		case GET_BOOK_DETAILS:
			return { ...state, bookDetails: Object.values(action.payload)[0] };
		case ERROR:
		case EMPTY_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default book;
