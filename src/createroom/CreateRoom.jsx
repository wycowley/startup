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
    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser == null) {
            window.alert("You must have an account selected to go to a room");
            navigate("/");
        }
    }, [navigate]);

    const changeRoomName = (event) => {
        setRoomName(event.target.value);
    };
    const changeAllowAnyone = (event) => {
        setAllowAnyone(event.target.checked);
    };
    const createRoomButtonClicked = () => {
        // TODO: actually create room in backend
        localStorage.setItem(roomName, JSON.stringify({ memories: [], allowAnyone: allowAnyone }));
        const usernames = localStorage.getItem("usernames");
        if (usernames) {
            const parsedUsernames = JSON.parse(usernames);
            const currentUser = localStorage.getItem("currentUser");
            if (parsedUsernames[currentUser]) {
                parsedUsernames[currentUser].defaultRoom = roomName;
                localStorage.setItem("usernames", JSON.stringify(parsedUsernames));
            }
        }
        navigate(`/room/${roomName}`);
    };
    return (
        <div className='create-room-section'>
            <h1>Welcome {localStorage.getItem("currentUser")}</h1>
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
                <button onClick={createRoomButtonClicked} ref={createButtonRef} className='basic-button'>
                    Create Room
                </button>
            </div>
        </div>
    );
}
