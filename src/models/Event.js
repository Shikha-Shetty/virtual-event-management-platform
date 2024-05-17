var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    date: {
        type: Date, required: [true, "Date not provided"]
    },
    time: {
        type: String, required: [true, "Time not provided"]
    },
    description: {
        type: String, required: [true, "Description not provided"]
    },
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Event", eventSchema);