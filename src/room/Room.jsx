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

    const handleLike = (memoryId) => {
        console.log("Like button clicked");
        const cardData = data.memories.find((m) => m.memoryId === memoryId);
        if (!cardData) {
            console.error("Memory not found");
            return;
        }
        if (cardData.liked) {
            cardData.likes = (cardData.likes ?? 1) - 1;
            cardData.liked = false;
            setData({ ...data });
            return;
        }
        const newLikes = (cardData.likes ?? 0) + 1;
        cardData.likes = newLikes;
        cardData.liked = true;
        setData({ ...data });
    };

    const memoryList = data.memories.map((cardData) => {
        return (
            <div className='card' key={cardData.memoryId}>
                <p className='timestamp'>
                    {cardData.timestamp} {hostLoggedIn && <button onClick={() => deleteMemory(cardData)}>×</button>}
                </p>
                <img src={cardData.imageUrl} />
                <div className='lower-content'>
                    <div className='description'>
                        <p>{cardData.description}</p>
                        <p>Posted by: {cardData.name}</p>
                    </div>
                    <button
                        className='likes'
                        onClick={() => {
                            handleLike(cardData.memoryId);
                        }}>
                        {cardData.likes ?? 0}
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' fill={cardData.liked ? "black" : "none"} stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
                            <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' />
                        </svg>
                    </button>
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
