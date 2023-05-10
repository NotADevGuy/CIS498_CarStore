// System dependencies
const express = require("express");
const router = express.Router();

// Import the model
const Car = require("../models/car_model");
const User = require("../models/user_model");


router.get("/getAllCars", async (req, res) => {
    const cars = await Car.find({});
    return res.status(200).json({ cars });
})

router.post("/addCar", async (req, res) => {
    const { make, model, year, color, price, description, username } = req.body;
    const user = User.findOne({ username })

    if (!user) {
        return res.status(404).json({ message: "User does not exist!", status: 404 })
    }

    const newCar = new Car({
        make: make, model: model, year: year, color: color, price: price, description: description,
        owner: username
    })
    await newCar.save()
        .then(() => {
            // return res.status(200).json({ message: "Car created successfully!", status: 200 })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message, status: 500 })
        })

    await user.updateOne({ $push: { cars: newCar._id } })
        .then(() => {
            return res.status(200).json({ message: "Car created successfully!", status: 200 })
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(500).json({ message: err.message, status: 500 })
        })
})

router.post("/delete", async (req, res) => {
    const { carInfo } = req.body;

    await Car.findOneAndDelete({ _id: carInfo._id })
        .then(() => {
            // return res.status(200).json({ message: "Car removed successfully!", status: 200 })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message, status: 500 })
        })

    const user = User.findOneAndUpdate(
        { username: carInfo.owner },
        { $pull: { cars: carInfo._id } },
        { new: true }
    )
        .then(() => {
            console.log("Car removed successfully!")
            return res.status(200).json({ message: "Car removed successfully!", status: 200 })
        })
        .catch((err) => {
            return res.status(500).json({ message: err.message, status: 500 })
        })
})

router.get("/search", async (req, res) => {
    const {query} = req.query;
    const isNumber = !isNaN(parseFloat(query)) && isFinite(query);
    let searchCondition = {
        $or: [
            {make: {$regex: query, $options: "i"}},
            {model: {$regex: query, $options: "i"}},
            {color: {$regex: query, $options: "i"}},
            {description: {$regex: query, $options: "i"}},
            {owner: {$regex: query, $options: "i"}}
        ],

    }

    if (isNumber) {
        searchCondition.$or.push({year: parseInt(query)})
        searchCondition.$or.push({price: parseInt(query)})
    }

    const cars = await Car.find(searchCondition);
    return res.json({cars});
})

module.exports = router;