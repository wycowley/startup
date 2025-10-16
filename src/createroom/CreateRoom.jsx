import React, { useState, useEffect, useRef } from "react";
import "./createroom.css";
import { useNavigate } from "react-router-dom";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [allowAnyone, setAllowAnyone] = useState(false);
    const createButtonRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (roomName == "") {
            createButtonRef.current.disabled = true;
        } else {
            createButtonRef.current.disabled = false;
        }
    }, [roomName]);

    const changeRoomName = (event) => {
        setRoomName(event.target.value);
    };
    const changeAllowAnyone = (event) => {
        setAllowAnyone(event.target.checked);
    };
    const createRoomButtonClicked = () => {
        // TODO: actually create room in backend
        localStorage.setItem(roomName, JSON.stringify([]));
        navigate(`/room/${roomName}`);
    };
    return (
        <div className='create-room-section'>
            <h1>Welcome "User"</h1>
            <section>
                <h2>Create a room:</h2>
                <label>Room Name: </label>
                <input type='text' placeholder='Enter room name' className='basic-input' value={roomName} onChange={changeRoomName} />
                <br />
                <div className='checkbox-section'>
                    <label>Allow anyone to add memories: </label>
                    <input type='checkbox' className='checkbox' checked={allowAnyone} onChange={changeAllowAnyone} />
                </div>
                <br />
            </section>
            <div className='create-button-section'>
                <button onClick={createRoomButtonClicked} ref={createButtonRef}>
                    Create Room
                </button>
            </div>
        </div>
    );
}
