import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
import {UserContext} from "../../App";
import "../main-styling.css"
import {backendURL} from "../../config";

export function Login() {
    const {setUser, setLogged} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // await axios.post('http://localhost:8080/api/user/login', {
        await axios.post(`${backendURL}/api/user/login`, {
            email: formData.email,
            password: formData.password
        })
            .then((response) => {
                setLogged(true);
                setUser(response.data.userInfo);
                navigate("/");
            })
            .catch((err) => {
                console.log(err)
                alert(`Error ${err.response.data.status}: ${err.response.data.message}`)
            })
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }


    return(
        <div className={"main-div"}>
            <div className={"form-info"}>
                <h2 className={"title"}>Cars4Sale Login</h2>
                <p className={"desc"}>Login to your account to view cars for sale!.</p>
            </div>

            <form className={"form"} onSubmit={handleSubmit}>
                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"emailValue"}>Email</label>
                    <input
                        className={"form-input"} id={"emailValue"}
                        type={"email"} name={"email"}
                        value={formData.email} onChange={handleChange}
                        required
                    />
                </div>
                <div className={"form-item"}>
                    <label className={"form-label"} htmlFor={"passwordValue"}>Password</label>
                    <input
                        className={"form-input"} id={"passwordValue"}
                        type={"password"} name={"password"}
                        value={formData.password} onChange={handleChange}
                        required
                    />
                </div>
                <button type={"submit"} className={"form-button"}>Login</button>
                <div className={"form-options"}>
                    <p>
                        <Link to={"/register"}>Don't have an account?</Link>
                        <span> | </span>
                        <Link to={"/reset"}>Forgot password?</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}