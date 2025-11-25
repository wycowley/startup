import React, { useEffect, useState, useRef } from "react";
import "./room.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { WebSocketHandler, Event, EventMessage } from "../WebSocketHandler";

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
            console.log(roomData);
            setData(roomData);

            setHostLoggedIn(roomData.hostLoggedIn);
            if (roomData.allowAnyone || roomData.hostLoggedIn) {
                dropMemoryButton.current.disabled = false;
            } else {
                dropMemoryButton.current.disabled = true;
            }
        };
        WebSocketHandler.addHandler(handleWebSocketMessage);
        fetchRoomData();

        return () => {
            WebSocketHandler.removeHandler(handleWebSocketMessage);
        };
    }, [roomName]);
    const handleWebSocketMessage = (message) => {
        console.log(message.type);
        console.log(Event.Like);

        // needs to be this because otherwise data will still be empty
        setData((prevData) => {
            const eventData = message.value;
            if (message.type == Event.Add) {
                const newMemories = [eventData, ...prevData.memories];
                return { ...prevData, memories: newMemories };
            } else if (message.type == Event.Delete) {
                const newMemories = prevData.memories.filter((m) => m.memoryId !== eventData.memoryId);
                return { ...prevData, memories: newMemories };
            } else if (message.type == Event.Like) {
                const newMemories = prevData.memories.map((m) => {
                    if (m.memoryId === eventData.memoryId) {
                        return { ...m, likes: eventData.likes };
                    }
                    return m;
                });
                return { ...prevData, memories: newMemories };
            }
            return prevData;
        });
    };

    const handleLike = async (memoryId) => {
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
        } else {
            const newLikes = (cardData.likes ?? 0) + 1;
            cardData.likes = newLikes;
            cardData.liked = true;
            setData({ ...data });
        }
        const result = await fetch(`/api/room/like/${username}/${roomName}/${memoryId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ liked: cardData.liked }),
        });
        if (!result.ok) {
            console.error("Failed to change like status");
            window.alert("Must be logged in to like memories");
            cardData.liked = !cardData.liked;
            if (cardData.liked) {
                cardData.likes = (cardData.likes ?? 0) + 1;
            } else {
                cardData.likes = (cardData.likes ?? 1) - 1;
            }
            setData({ ...data });
        } else {
            console.log("Successfully changed like status");
            WebSocketHandler.broadcastEvent("DropAMemory", Event.Like, { memoryId: memoryId, likes: cardData.likes });
        }
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
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' height='20' fill={cardData.liked ? "black" : "none"} stroke='currentColor' stroke-width='2'>
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
        } else {
            WebSocketHandler.broadcastEvent("DropAMemory", Event.Delete, { memoryId: memory.memoryId });
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
