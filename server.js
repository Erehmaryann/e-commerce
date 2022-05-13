const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;

// gives access to our .env file
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Body parser middleware for parsing JSON instead of calling the .json() method all the time when making requests
app.use(bodyParser.json());

// to make sure the url we are passing in and out doesn't contain spaces or symbols.
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

// This displays message that the server running and listening to specified port
app.listen(port, error => {
    if (error) throw error;
    console.log(`Listening on port ${port}`);
});

// payment route
app.post('/payment', (req, res) => {
    console.log(req.body);
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    });
    // res.send({ success: true });
});

// create a GET route
// app.get('/express_backend', (req, res) => {
//     res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });