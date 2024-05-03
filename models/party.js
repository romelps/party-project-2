const mongoose = require('mongoose')

const partyPlannerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true},
    openInvite: String,
    theme: { type: String, required: true },
    numGuests: { type: Number, required: true },
    // guestlist: String,
    // budget: Number,
});

const PartyPlanner = mongoose.model("PartyPlanner", partyPlannerSchema);
module.exports = PartyPlanner;