import React from "react";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import CreateRoom from "./createroom/CreateRoom";
import Room from "./room/Room";
import DropMemory from "./dropmemory/DropMemory";

export default function App() {
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <h1>Drop a Memory</h1>
                    <div className='room-selector'>
                        <label>Go to room: </label>
                        <input type='text' placeholder='Room ID' className='basic-input' />
                        <button className='basic-button'>
                            <NavLink to='/room'>Go</NavLink>
                        </button>
                    </div>
                </nav>
            </header>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/createroom' element={<CreateRoom />} />
                <Route path='/room' element={<Room />} />
                <Route path='/dropmemory' element={<DropMemory />} />
            </Routes>
            <footer>
                <p>Created by Wyatt Cowley</p>
                <a href='https://github.com/wycowley/startup' target='_blank'>
                    Github
                </a>
            </footer>
        </BrowserRouter>
    );
}
