const mongoose = require("mongoose")
const adminSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    tip: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    teamA: {
        type: String,
        required: true
    },
    teamAscore: {
        type: Number,
        required: true
    },
    teamBscore: {
        type: Number,
        required: true
    },   
    teamB: {
        type: String,
    },
    
    teamAIcon: {
        type: String,
        required: true
    },
    teamBIcon: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    league: {
        type: String,
        required: true
    },
    leagueIcon: {
        type: String,
        required: true
    },
    formationA: {
        type: Array,
        required: true
    },
    formationB: {
        type: Array,
        required: true
    }
},{timestamps: true})

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;