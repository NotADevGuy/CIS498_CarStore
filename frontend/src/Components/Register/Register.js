import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios'
import "../main-styling.css"
import {backendURL} from "../../config";

export function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // await axios.post('http://localhost:8080/api/user/register', {
        await axios.post(`${backendURL}/api/user/register`, {
            name: formData.name,
            email: formData.email,
            username: formData.username,
            password: formData.password,
            isAdmin: false
        })
            .then(() => {
                alert("Account created successfully!")
                navigate("/login");
            })
            .catch((err) => {
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
        <div className="main-div">
            <div className="form-info">
                <h2 className="title">
                    Register for an Account
                </h2>
                <p className="desc">
                    Create a new account to access all the features of
                    our platform.
                </p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" id="username" name="username"  className="form-input" placeholder="Enter a username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="form-item">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" name="password"  className="form-input" placeholder="Enter a password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-item">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email"  className="form-input" placeholder="Enter your email address" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-item">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name"  className="form-input" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
                </div>
                <button className="form-button" type="submit">Create Account</button>
                <div className="form-options">
                    <p>Already have an account? <Link to="/login" className="form-link">Login here</Link>.</p>
                </div>
            </form>
        </div>

    );
}