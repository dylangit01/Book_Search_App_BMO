import { GET_BOOK_DETAILS } from "../actions/bookAction";

const book = (bookDetails = null, action) => {
	console.log(action.payload);
	switch (action.type) {
		case GET_BOOK_DETAILS:
			return action.payload
		default:
			return bookDetails
	}
}

export default book;
