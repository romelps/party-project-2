const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config()

const morgan = require('morgan');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

const Party = require('./models/party.js')

//home page
app.get('/', (req, res) => {
    res.render("home.ejs");
  });

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
  
app.listen(1000, () => {
    console.log('listening on port 1000');
})