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

            setRooms(await rooms.json());
        };

        fetchRooms();
    }, []);
    return (
        <div>
            <h1>Your rooms</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room.name}>
                        <b>{room.name}</b> - {room.memories.length} memories
                        <button
                            onClick={() => {
                                navigate(`/room/${room.name}`);
                            }}>
                            Go to room
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
