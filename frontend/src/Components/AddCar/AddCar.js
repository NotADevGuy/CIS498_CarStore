import React, { useState, useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../main-styling.css"
import "../../config.js"
import {backendURL} from "../../config";

export function AddCar() {
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        description: "",
    })
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // await axios.post("http://localhost:8080/api/car/addCar", {
        await axios.post(`${backendURL}/api/car/addCar`, {
            make: formData.make,
            model: formData.model,
            color: formData.color,
            year: formData.year,
            price: formData.price,
            description: formData.description,
            username: user.username
        })
            .then((response) => {
                alert("Car added successfully!");
            })
            .catch((err) => {
                alert(`Error ${err.response.data.status}: ${err.response.data.message}`)
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="main-div">
            <div className={"form-info"}>
                <h2 className={"title"}>Add a Car</h2>
            </div>

            <form className={"form"} onSubmit={handleSubmit}>
                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"makeValue"}>Make</label>
                    <input
                        className={"form-input"} id={"makeValue"}
                        type={"text"} name={"make"}
                        value={formData.make} onChange={handleChange}
                        required
                    />
                </div>

                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"modelValue"}>Model</label>
                    <input
                        className={"form-input"} id={"modelValue"}
                        type={"text"} name={"model"}
                        value={formData.model} onChange={handleChange}
                        required
                    />
                </div>

                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"colorValue"}>Color</label>
                    <input
                        className={"form-input"} id={"colorValue"}
                        type={"text"} name={"color"}
                        value={formData.color} onChange={handleChange}
                        required
                    />
                </div>

                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"yearValue"}>Year</label>
                    <input
                        className={"form-input"} id={"yearValue"}
                        type={"number"} name={"year"}
                        value={formData.year} onChange={handleChange}
                        required
                    />
                </div>

                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"priceValue"}>Price</label>
                    <input
                        className={"form-input"} id={"priceValue"}
                        type={"number"} name={"price"}
                        value={formData.price} onChange={handleChange}
                        required
                    />
                </div>

                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"descriptionValue"}>Description</label>
                    <input
                        className={"form-input"} id={"descriptionValue"}
                        type={"text"} name={"description"}
                        value={formData.description} onChange={handleChange}
                        required
                    />
                </div>

                <button className={"form-button"} type={"submit"}>Add Car</button>
            </form>
        </div>
    );
}