const router = require('express').Router();
const axios = require('axios')

// Fetch all books from library API
router.post('/', async (req, res) => {
	const URL = 'https://openlibrary.org/search.json?q=';
	try {
		const { query } = req.body;
		const { data } = await axios.get(`${URL}${query}`);
		res.json(data)
	} catch (error) {
		res.status(500).json({msg: 'something went wrong'})
	}
})

router.post('/bookdetails', async (req, res) => {
	const URL = 'https://openlibrary.org/api/volumes/brief/isbn';
	try {
		const { isbnQuery } = req.body;
		const { data } = await axios.get(`${URL}/${isbnQuery}.json`);
		res.json(data);
	} catch (error) {
		res.status(500).json({msg: 'something went wrong'})
	}
})


// Fetch books by author:
router.post('/authors', async (req, res) => {
	const URL = 'http://openlibrary.org/search/authors.json?q=';
	try {
		const { authorQuery } = req.body;
		const { data } = await axios.get(`${URL}${authorQuery}`);
		res.json(data);
	} catch (error) {
		res.status(500).json({ msg: 'something went wrong' });
	}
});

module.exports = router