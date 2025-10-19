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

    const loginButtonClicked = () => {
        // TODO: actually log in and get user data from backend
        const strings = localStorage.getItem("usernames");
        if (strings) {
            const usernames = JSON.parse(strings);
            if (usernames[username]?.password === password) {
                localStorage.setItem("currentUser", username);
                navigate(`/room/${usernames[username].defaultRoom}`);
            } else {
                window.alert("Invalid username or password");
            }
        } else {
            window.alert("Invalid username or password");
        }
    };
    const createButtonClicked = () => {
        const strings = localStorage.getItem("usernames");
        if (strings) {
            const usernames = JSON.parse(strings);
            if (usernames[username]) {
                window.alert("Username already exists");
                return;
            }
            usernames[username] = { password: password };
            localStorage.setItem("usernames", JSON.stringify(usernames));
        } else {
            const usernames = {};
            usernames[username] = { password: password };
            localStorage.setItem("usernames", JSON.stringify(usernames));
        }
        localStorage.setItem("currentUser", username);
        navigate("/createroom");
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
