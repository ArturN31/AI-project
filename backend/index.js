require("dotenv").config();

//Express setup
const express = require('express');
const app = express();

//Cors policy setup
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: false })); //body parser 
app.use(express.json()); //parses incoming json to the req.body
const request = require('request'); //api requests

let data = {year: '1950', month: '5'};

app.post('/news', function (req, res, next) {
    data = {year: req.body.year, month: req.body.month};
    res.end();
})

//used to fetch news to the frontend
app.get('/news', cors(), function (req, res, next) {
    request('https://api.nytimes.com/svc/archive/v1/' + data.year + '/' + data.month + '.json?api-key=' + process.env.NY_TIMES_API_KEY, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            res.json(response); //print response to body as a json
        }
        if (error) {res.send(error)}
    })
})

//port listening
app.listen(process.env.PORT || 3001, () => {
    console.log('Server started on port 3001. Ctrl^c to quit.');
});