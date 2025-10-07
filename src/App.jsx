import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <h1>Drop a Memory</h1>
                    <div class='room-selector'>
                        <label>Go to room: </label>
                        <input type='text' placeholder='Room ID' class='basic-input' />
                        <button class='basic-button'>
                            <a href='/room.html'>Go</a>
                        </button>
                    </div>
                </nav>
            </header>
            <Routes>
                <Route path='/' element={<h2>Welcome to Drop a Memory! Enter a room ID to get started.</h2>} />
                <Route path='/createroom' element={<h2>This is where the room content will go.</h2>} />
                <Route path='/room' element={<h2>This is where the room content will go.</h2>} />
                <Route path='/room' element={<h2>This is where the room content will go.</h2>} />
            </Routes>
            <footer>
                <p>Created by Wyatt Cowley</p>
                <a href='https://github.com/wycowley/startup'>Github</a>
            </footer>
        </BrowserRouter>
    );
}
