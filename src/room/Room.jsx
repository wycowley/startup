import React, { useEffect, useState, useRef } from "react";
import "./room.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export default function Room() {
    const { id } = useParams();
    const [data, setData] = useState({ memories: [] });
    const dropMemoryButton = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = `Room: ${id}`;
        const storedData = localStorage.getItem(id);
        if (storedData == null) {
            setData({ memories: [] });
        } else {
            setData(JSON.parse(storedData));
            if (JSON.parse(storedData).allowAnyone) {
                dropMemoryButton.current.disabled = false;
            } else {
                const currentUser = localStorage.getItem("currentUser");
                const usernames = localStorage.getItem("usernames");
                if (usernames) {
                    const parsedUsernames = JSON.parse(usernames);
                    if (parsedUsernames[currentUser]) {
                        const defaultRoom = parsedUsernames[currentUser].defaultRoom;
                        if (defaultRoom === id) {
                            dropMemoryButton.current.disabled = false;
                        } else {
                            dropMemoryButton.current.disabled = true;
                        }
                    } else {
                        dropMemoryButton.current.disabled = true;
                    }
                } else {
                    dropMemoryButton.current.disabled = true;
                }
            }
        }
    }, [id]);

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
                <h1 className='title'>{id}</h1>
                <div>
                    <button className='basic-button' onClick={() => navigate(`/dropmemory/${id}`)} ref={dropMemoryButton}>
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
