const router = require('express').Router();
const axios = require('axios')

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

module.exports = router