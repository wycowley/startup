import React, { useEffect, useState, useRef } from "react";
import "./login.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginButton = useRef(null);
    const createAccountButton = useRef(null);

    const usernameUpdated = (event) => {
        setUsername(event.target.value);
    };
    const passwordUpdated = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        if (username == "" || password == "") {
            loginButton.current.disabled = true;
            createAccountButton.current.disabled = true;
        } else {
            loginButton.current.disabled = false;
            createAccountButton.current.disabled = false;
        }
    }, [username, password]);

    const loginButtonClicked = async () => {
        const result = await fetch(`/api/auth`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (result.ok) {
            navigate("/browserooms");
        } else {
            window.alert("Invalid username or password");
        }
    };
    const createButtonClicked = async () => {
        const result = await fetch(`/api/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        if (!result.ok) {
            window.alert("Failed to create account: " + (await result.json()).msg);
        } else {
            navigate("/createroom");
        }
    };

    return (
        <div className='content-index'>
            <h1>Let's start:</h1>
            <section className='input-section'>
                <label>Username: </label>
                <input type='text' placeholder='Your username' className='basic-input' onChange={usernameUpdated} value={username} />
                <br />
                <label>Password: </label>
                <input type='password' placeholder='Your password' className='basic-input' onChange={passwordUpdated} value={password} />
            </section>
            <section className='button-section'>
                <button ref={loginButton} onClick={loginButtonClicked} className='basic-button'>
                    Login
                </button>
                <button ref={createAccountButton} onClick={createButtonClicked} className='basic-button'>
                    Create Account
                </button>
            </section>
        </div>
    );
}
