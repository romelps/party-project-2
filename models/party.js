const mongoose = require('mongoose')

const partyPlannerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    theme: { type: String, required: true },
    numguests: { type: Number, required: true },
    guestlist: String,
    budget: Number,
});

const PartyPlanner = mongoose.model("PartyPlanner", partyPlannerSchema);
module.exports = PartyPlanner;