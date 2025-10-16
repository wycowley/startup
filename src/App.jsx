import React from "react";
import "./app.css";
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./login/Login";
import CreateRoom from "./createroom/CreateRoom";
import Room from "./room/Room";
import DropMemory from "./dropmemory/DropMemory";
import Navigation from "./Navigation";

export default function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/createroom' element={<CreateRoom />} />
                <Route path='/room/:id' element={<Room />} />
                <Route path='/dropmemory/:id' element={<DropMemory />} />
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
