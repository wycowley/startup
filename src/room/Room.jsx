import React, { useEffect, useState, useRef } from "react";
import "./room.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export default function Room() {
    const { username, roomName } = useParams();
    const [data, setData] = useState({ memories: [] });
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
                window.alert("Failed to fetch room data, returning to home page");
                navigate("/");
                return;
            }
            const roomData = await result.json();
            setData(roomData);
        };
        fetchRoomData();
    }, [roomName]);

    const memoryList = data.memories.map((cardData) => {
        return (
            <div className='card'>
                <p className='timestamp'>
                    {cardData.timestamp} <button>×</button>
                </p>
                <img src={cardData.imageUrl} />

                <div className='description'>
                    <p>{cardData.description}</p>
                    <p>Posted by: {cardData.user}</p>
                </div>
            </div>
        );
    });
    let a = [3, 5, 6, 2, 4];
    a.reduce((acc, val) => acc + val);
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
