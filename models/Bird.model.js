const mongoose = require("mongoose");

const {
    Schema,
    model
} = mongoose;

const birdSchema = new Schema({
    name: String,
    scientificName: String,
    dateOfSight: String,
    location: String,
    imageUrl: String,
    moreInfo: String,
}, {
    timestamps: true
});

module.exports = model("Bird", birdSchema);