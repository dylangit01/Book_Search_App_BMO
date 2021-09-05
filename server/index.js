const cors = require('cors');
const express = require('express');
const bookRouter = require('./routes/book.js');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('APP API is running');
});

app.use('/api/book', bookRouter);

app.listen(PORT, () => {
	console.log('App listening on port 5000!');
});
