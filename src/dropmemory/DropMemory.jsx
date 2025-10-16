import React, { useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./dropmemory.css";

export default function DropMemory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const currentTime = new Date().toLocaleString();

    const changeName = (event) => {
        setName(event.target.value);
    };
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };
    const changeImageUrl = (event) => {
        setImageUrl(event.target.value);
    };

    const dropMemoryButtonClicked = () => {
        let currentData = localStorage.getItem(id);
        if (!currentData) {
            currentData = "[]";
        }

        const parsedData = JSON.parse(currentData);
        parsedData.push({
            timestamp: currentTime,
            imageUrl: imageUrl,
            description: description,
            user: name,
        });
        localStorage.setItem(id, JSON.stringify(parsedData));
        navigate(`/room/${id}`);
    };

    return (
        <div className='creation-section'>
            <h1>
                Visited <b>User</b>? Record the experience:
            </h1>
            <section className='required-items'>
                <p>
                    Current time: <i id='current-time'>{currentTime}</i>
                </p>
                <label>Your name: </label>
                <input type='text' placeholder='Name' className='basic-input' value={name} onChange={changeName} />
                <br />
                <label>Description: </label> <br />
                <textarea placeholder='This is what happened...' value={description} onChange={changeDescription}></textarea>
            </section>
            <section className='optional-items'>
                <h2>Optional:</h2>
                <label>Image Search: </label>
                <span>
                    <input type='text' placeholder='Keyword' className='basic-input' value={imageUrl} onChange={changeImageUrl} />
                    <button className='basic-button'>
                        <a>Search</a>
                    </button>
                </span>
                <br />
            </section>

            <div className='drop-button'>
                <button className='basic-button' onClick={dropMemoryButtonClicked}>
                    Drop the Memory
                </button>
            </div>
        </div>
    );
}
