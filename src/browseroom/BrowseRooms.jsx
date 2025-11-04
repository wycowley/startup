import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function BrowseRooms() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const fetchRooms = async () => {
            const rooms = await fetch("/api/rooms/available", {
                method: "GET",
            });
            if (!rooms.ok) {
                console.error("Failed to fetch available rooms");
                window.alert("Not logged in, please go to login page");
                navigate("/");
            }
            const data = await rooms.json();
            setRooms(data.rooms);
        };

        fetchRooms();
    }, []);
    return (
        <div>
            <h1>Your rooms</h1>
            {rooms.length === 0 && <p>No rooms available.</p>}
            <ul>
                {rooms.length > 0 &&
                    rooms.map((room) => (
                        <li key={room.name}>
                            <b>{room.name}</b> - {room.memories.length} memories
                            <button
                                onClick={() => {
                                    navigate(`/room/${room.owner}/${room.name}`);
                                }}>
                                Go to room
                            </button>
                        </li>
                    ))}
            </ul>
            <button onClick={() => navigate("/createroom")} className='basic-button'>
                Create Room
            </button>
        </div>
    );
}
