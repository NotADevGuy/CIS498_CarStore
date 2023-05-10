import React, {useContext} from "react";
import {UserContext} from "../../App";
import {useNavigate} from "react-router-dom";
import "../main-styling.css"

export function Home() {
    const {user, setUser, setLogged} = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className={"main-div"}>
            <div className={"form-info"}>
                <h2 className={"title"}>Welcome to Cars4Sale!</h2>
                <p className={"desc"}>
                    This is a website where you can view cars for sale!
                    Please feel free to navigate around and view the cars.
                    Or you could even list your own car for sale!
                </p>
            </div>
        </div>
    )
}