let mongoose = require("mongoose");

let schema = mongoose.Schema;
let Car = new schema({
    make: String, model: String,
    year: Number, color: String,
    price: Number, description: String,
    owner: String
}, {timestamps:true});

const car_model = mongoose.model("cars", Car);

module.exports = car_model;
