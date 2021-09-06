const router = require('express').Router();
const axios = require('axios')

router.post('/', async (req, res) => {
	try {
		const { isbnQuery } = req.body;
		const { data } = await axios.get(`https://openlibrary.org/api/volumes/brief/isbn/${isbnQuery}.json`);
		res.json(data);
	} catch (error) {
		res.status(500).json({msg: 'something went wrong'})
	}
})

module.exports = router