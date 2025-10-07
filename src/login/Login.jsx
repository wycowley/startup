import React from "react";
import "./login.css";

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
                    <a href='/room.html'>Login</a>
                </button>
                <button>
                    <a href='/createroom.html'>Create Account</a>
                </button>
            </section>
        </div>
    );
}
