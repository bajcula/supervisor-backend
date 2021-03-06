require('dotenv').config()
const express = require('express');
const {urlencoded} = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const workerController = require('./controllers/workerController')
const userController = require('./controllers/userController')
const app = express();
const port = process.env.PORT || 3001
const MONGOURI = process.env.MONGO_URI
mongoose.connect(MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: '));
db.on('disconnected', () => console.log('mongo disconnected'));

app.use(morgan('short'))
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/workers', workerController)
app.use('/users', userController)

app.listen(port, () => {
    console.log('app running...')
})