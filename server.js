const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const morgan = require('morgan');
const methodOverride = require('method-override');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)

app.use(express.urlencoded({extended: false}))

app.use(methodOverride('_method'))

const PartyPlanner = require('./models/party.js')

const path = require("path");
app.use(express.static(path.join(__dirname, "public"))); //these two lines are needed to use css

//home page
app.get('/', (req, res) => {
    res.render("home.ejs");
});

//takes us to edit page
app.get('/parties/:partyId/edit', async (req, res) => {
    const foundParty = await PartyPlanner.findById(req.params.partyId) //we find the id itself first
    res.render('parties/edit.ejs', {
        party: foundParty
    })
})

app.delete('/parties/:partyId', async (req, res) => {
    await PartyPlanner.findByIdAndDelete(req.params.partyId);
    res.redirect('/parties');
})

app.get('/parties', async (req, res) => {
    const allParties = await PartyPlanner.find({});
    res.render('parties/index.ejs', {
        parties: allParties
    });
});



app.post('/parties', async (req, res) => {
    console.log(req.body)
    const { name, date, address, openInvite, theme, dressCode, numGuests, guestList, budget } = req.body;
    //const newParty = PartyPlanner(req.body);
    if(req.body.openInvite === 'on'){
        req.body.openInvite = true;
    }
    else {
        req.body.openInvite = false;
    }
    await PartyPlanner.create(req.body);
    res.redirect('/parties');
})


//does the actual editting
app.put('/parties/:partyId', async (req, res) => {
    if(req.body.openInvite === 'on'){
        req.body.openInvite = true;
    }
    else {
        req.body.openInvite = false;
    }
    await PartyPlanner.findByIdAndUpdate(req.params.partyId, req.body);
    res.redirect('/parties');
})

app.get('/parties/new', (req, res) => {
    res.render('parties/new.ejs')
})

// const updateDate = () => {
//     const d = new Date();
//     let req.body.date = d.toDateString();
//      //syntax from w3 schools
// }

app.get('/parties/:partyId', async (req, res) => {
    //updateDate();
    const foundParty = await PartyPlanner.findById(req.params.partyId)
    res.render('parties/show.ejs', {
        party: foundParty
    })
})



mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})
  
app.listen(2700, () => {
    console.log('listening on port 2700');
});