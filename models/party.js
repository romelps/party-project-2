const mongoose = require('mongoose')

const partyPlannerSchema = new mongoose.Schema({
    name: String,
    date: Date,
    time: String,
    address: String,
    openInvite: Boolean,
    theme: String,
    dressCode: String,
    numGuests: Number,
    guestList: String,
    budget: Number,
});

const PartyPlanner = mongoose.model("PartyPlanner", partyPlannerSchema);
module.exports = PartyPlanner;

