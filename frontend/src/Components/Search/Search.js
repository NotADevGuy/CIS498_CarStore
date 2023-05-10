import React, {useContext, useState} from "react";
import axios from "axios";
import "../main-styling.css"
import {UserContext} from "../../App";
import {backendURL} from "../../config";

export function Search() {
    const { user } = useContext(UserContext);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ cars: [] });

    const handleSubmit = async (event) => {
        event.preventDefault();

        // await axios.get(`http://localhost:8080/api/car/search?query=${query}`)
        await axios.get(`${backendURL}/api/car/search?query=${query}`)
            .then((res) => {
                setResults(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDelete = async (car) => {
        // await axios.post("http://localhost:8080/api/car/delete", {
        await axios.post(`${backendURL}/api/car/delete`, {
            carInfo: car
        })
            .then(() => {
                alert("Car deleted successfully")
            })
            .catch((response) => {
                alert(response.response.data.message);
            })
    }


    return(
        <div className={"main-div"}>
            <div className={"form-info"}>
                <h2 className={"title"}>Search for Cars</h2>
            </div>

            <form className={"form"} onSubmit={handleSubmit}>
                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"search-input"}>Search:</label>
                    <input
                        className={"form-input"} id={"search-input"}
                        type={"text"} value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        required
                    />
                </div>
                <button className={"form-button"} type={"submit"}>Search</button>
            </form>

            <div className={"form-item"}>
                <p className={"desc"}>Cars:</p>
                <ul>
                    {(results.cars !== null && results.cars.length > 0) ? (
                        results.cars.map((car) => (
                                <li key={car._id}>
                                    <p className={"desc"}>
                                        <ul>
                                            <li>Car: {`${car.year} ${car.color} ${car.make} ${car.model} for $${car.price}`}</li>
                                            <li>Owner: {car.owner}</li>
                                            <li>Description: {car.description}</li>
                                            {car.owner === user.username &&
                                                <button onClick={() => {handleDelete(car)}} className={"form-button"}>Delete</button>}
                                        </ul>
                                    </p>
                                </li>
                            ))

                    ) : (<li><p className={"desc"}>No cars found</p></li>)}
                </ul>
            </div>
        </div>
    );
}