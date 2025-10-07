import React from "react";
import "./login.css";
import { NavLink } from "react-router-dom";

export default function Login() {
    return (
        <div class='content-index'>
            <h1>Let's start:</h1>
            <section class='input-section'>
                <label>Username: </label>
                <input type='text' placeholder='Your username' class='basic-input' />
                <br />
                <label>Password: </label>
                <input type='password' placeholder='Your password' class='basic-input' />
            </section>
            <section class='button-section'>
                <button>
                    <NavLink to='room'>Login</NavLink>
                </button>
                <button>
                    <NavLink to='createroom'>Create Account</NavLink>
                </button>
            </section>
        </div>
    );
}
