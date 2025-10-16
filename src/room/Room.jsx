import React, { useEffect, useState } from "react";
import "./room.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export default function Room() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        document.title = `Room: ${id}`;
        const storedData = localStorage.getItem(id);
        if (storedData == null) {
            setData([]);
        } else {
            setData(JSON.parse(storedData));
        }
    }, [id]);

    const memoryList = data.map((cardData) => {
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

    return (
        <div>
            <section className='title-section'>
                <h1 className='title'>User's Room</h1>
                <div>
                    <button className='basic-button' onClick={() => navigate(`/dropmemory/${id}`)}>
                        Drop a Memory
                    </button>
                    <button className='basic-button' onClick={() => navigate("/")}>
                        Go Home
                    </button>
                </div>
            </section>

            <section className='card-container'>{memoryList}</section>
        </div>
    );
}
