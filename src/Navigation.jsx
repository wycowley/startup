import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const buttonRef = useRef(null);

    const updateRoomId = (event) => {
        setRoomId(event.target.value);
    };

    useEffect(() => {
        if (roomId == "") {
            buttonRef.current.disabled = true;
        } else {
            buttonRef.current.disabled = false;
        }
    }, [roomId]);

    return (
        <header>
            <nav>
                <h1>Drop a Memory</h1>
                <div className='room-selector'>
                    <label>Go to room: </label>
                    <input type='text' placeholder='Room ID' className='basic-input' value={roomId} onChange={updateRoomId} />
                    <button className='basic-button' onClick={() => navigate(`/room/${roomId}`)} ref={buttonRef}>
                        Go
                    </button>
                </div>
            </nav>
        </header>
    );
}
