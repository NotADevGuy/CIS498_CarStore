const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = "mongodb+srv://matttbailey13mongo:XoO7ZfdTs34gHe6b@cluster0.juxzjto.mongodb.net/498Final"

db.users = require("./user_model");
db.cars = require("./car_model");

module.exports = db;