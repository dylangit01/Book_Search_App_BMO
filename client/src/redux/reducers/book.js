import { GET_BOOK_DETAILS } from "../actions/bookAction";

const book = (bookDetails = {}, action) => {
	switch (action.type) {
		case GET_BOOK_DETAILS:
			return { ...Object.values(action.payload)[0] }
		default:
			return bookDetails
	}
}

export default book;
