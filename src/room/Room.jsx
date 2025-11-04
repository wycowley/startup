import React, { useEffect, useState, useRef } from "react";
import "./room.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export default function Room() {
    const { username, roomName } = useParams();
    const [data, setData] = useState({ memories: [] });
    const [hostLoggedIn, setHostLoggedIn] = useState(false);
    const dropMemoryButton = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = `Room: ${roomName}`;
        const fetchRoomData = async () => {
            const result = await fetch(`/api/room/${username}/${roomName}`, {
                method: "GET",
            });
            if (!result.ok) {
                console.error("Failed to fetch room data");
                window.alert("Failed to fetch room data, returning to previous page");
                navigate(-1);
                return;
            }
            const roomData = await result.json();
            setData(roomData);
            setHostLoggedIn(roomData.hostLoggedIn);
            if (roomData.allowAnyone || roomData.hostLoggedIn) {
                dropMemoryButton.current.disabled = false;
            } else {
                dropMemoryButton.current.disabled = true;
            }
        };
        fetchRoomData();
    }, [roomName]);

    const memoryList = data.memories.map((cardData) => {
        return (
            <div className='card' key={cardData.memoryId}>
                <p className='timestamp'>
                    {cardData.timestamp} {hostLoggedIn && <button onClick={() => deleteMemory(cardData)}>×</button>}
                </p>
                <img src={cardData.imageUrl} />

                <div className='description'>
                    <p>{cardData.description}</p>
                    <p>Posted by: {cardData.name}</p>
                </div>
            </div>
        );
    });
    const deleteMemory = async (memory) => {
        const result = await fetch(`/api/room/delete/${username}/${roomName}/${memory.memoryId}`, {
            method: "DELETE",
        });
        if (!result.ok) {
            console.error("Failed to delete memory");
            window.alert("Failed to delete memory");
        }
        // refresh the memory list
        const newData = data.memories.filter((m) => m.memoryId !== memory.memoryId);
        setData({ ...data, memories: newData });
    };
    // will output
    return (
        <div>
            <section className='title-section'>
                <h1 className='title'>{roomName}</h1>
                <div>
                    <button className='basic-button' onClick={() => navigate(`/dropmemory/${username}/${roomName}`)} ref={dropMemoryButton}>
                        Drop a Memory
                    </button>
                    <button className='basic-button' onClick={() => navigate("/")}>
                        Go Home
                    </button>
                </div>
            </section>

            <section className='card-container'>{data.memories.length == 0 ? <p>No memories found yet!</p> : memoryList}</section>
        </div>
    );
}
