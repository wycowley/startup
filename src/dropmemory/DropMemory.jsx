import React from "react";
import { NavLink } from "react-router-dom";
import "./dropmemory.css";

export default function DropMemory() {
    return (
        <div className='creation-section'>
            <h1>
                Visited <b>User</b>? Record the experience:
            </h1>
            <section className='required-items'>
                <p>
                    Current time: <i id='current-time'>Sep 17 5:24pm</i>
                </p>
                <label>Your name: </label>
                <input type='text' placeholder='Name' className='basic-input' />
                <br />
                <label>Description: </label> <br />
                <textarea placeholder='This is what happened...'></textarea>
            </section>
            <section className='optional-items'>
                <h2>Optional:</h2>
                <label>Image Search: </label>
                <span>
                    <input type='text' placeholder='Keyword' className='basic-input' />
                    <button className='basic-button'>
                        <a>Search</a>
                    </button>
                </span>
                <br />
            </section>

            <div className='drop-button'>
                <button className='basic-button'>
                    <NavLink to='/room'>Drop the Memory</NavLink>
                </button>
            </div>
        </div>
    );
}
