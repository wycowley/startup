import React from "react";
import "./createroom.css";
import { NavLink } from "react-router-dom";

export default function CreateRoom() {
    return (
        <div className='create-room-section'>
            <h1>Welcome "User"</h1>
            <section>
                <h2>Create a room:</h2>
                <label>Room Name: </label>
                <input type='text' placeholder='Enter room name' className='basic-input' />
                <br />
                <div className='checkbox-section'>
                    <label>Allow anyone to add memories: </label>
                    <input type='checkbox' className='checkbox' />
                </div>
                <br />
            </section>
            <div className='create-button-section'>
                <button>
                    <NavLink to='/room'>Create Room</NavLink>
                </button>
            </div>
        </div>
    );
}
