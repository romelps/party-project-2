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

app.get('/parties', async (req, res) => {
    const allParties = await Party.find({});
    res.render('parties/index.ejs', {
        parties: allParties
    })
})

app.post('/parties', async (req, res) => {
    const newParty = new Party({ name, date, openInvite, theme, numGuests})
    if(req.body.openInvite === 'on'){
        req.body.openInvite = true;
    }
    else {
        req.body.openInvite = false;
    }
    await Party.create(req.body);
    res.redirect('/parties');
})

app.get('/parties/new', (req, res) => {
    res.render('parties/new.ejs')
})



mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
  
app.listen(2600, () => {
    console.log('listening on port 2600');
});