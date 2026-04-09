const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { response: null });
});

app.post('/submit', async (req, res) => {
    try {
        const response = await axios.post('http://backend:5000/submit', {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        res.render('index', { response: response.data });
    } catch (error) {
        res.render('index', {
            response: {
                status: 'error',
                message: 'Unable to connect to Flask backend'
            }
        });
    }
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Frontend running on port 3000');
});