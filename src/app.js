const express = require('express');
const {signup, login} = require('./controllers/authController');
const {createEvent, updateEvent, viewEvents, viewEventByID, deleteEvent, registerUserForEvent} = require('./controllers/eventController');
const mongoose = require('mongoose');
const verifyToken = require('./middlewares/authJwt');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 3000;

try {
    mongoose.connect("mongodb://localhost:27017/eventsdb", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Connected to the db");
} catch (err) {
    conosole.log("Connection to the db failed");
}

app.post('/register', signup);
app.post('/login', login);
app.post('/events', verifyToken, createEvent);
app.get('/events', verifyToken, viewEvents);
app.get('/events/:id', verifyToken, viewEventByID);
app.patch('/events/:id', verifyToken, updateEvent);
app.delete('/events/:id', verifyToken, deleteEvent);
app.post('/events/:eventId/register', verifyToken, registerUserForEvent);

app.get('/', (req, res) => {
    return res.status(200).send("Hello World");
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;