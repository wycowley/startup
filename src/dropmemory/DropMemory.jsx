import React, { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./dropmemory.css";

export default function DropMemory() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageKeyword, setImageKeyword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [searchedImages, setSearchedImages] = useState([]);
    const [currentTime, setCurrentTime] = useState("");
    const imageOptions = [
        "https://plus.unsplash.com/premium_photo-1671656349007-0c41dab52c96?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        "https://images.unsplash.com/photo-1607601657036-a1af652ed522?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774",
        "https://images.unsplash.com/photo-1618808786465-daf6c13d573c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1734",
        "https://plus.unsplash.com/premium_photo-1668698357735-d2bc81745e5d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
    ];

    const changeName = (event) => {
        setName(event.target.value);
    };
    const changeDescription = (event) => {
        setDescription(event.target.value);
    };
    const changeImageUrl = (event) => {
        setImageUrl(event.target.value);
    };
    const changeImageKeyword = (event) => {
        setImageKeyword(event.target.value);
    };

    const dropMemoryButtonClicked = () => {
        let currentData = localStorage.getItem(id);
        if (!currentData) {
            currentData = "[]";
        }

        const parsedData = JSON.parse(currentData);
        parsedData.memories.push({
            timestamp: currentTime,
            imageUrl: imageUrl,
            description: description,
            user: name,
        });
        localStorage.setItem(id, JSON.stringify(parsedData));
        navigate(`/room/${id}`);
    };

    const imageSearch = (event) => {
        event.preventDefault();
        if (imageKeyword == "") {
            setSearchedImages([]);
            return;
        }
        // TODO: actually search images
        console.log("Image search called");
        setSearchedImages(imageOptions);
    };

    useEffect(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleString());
    }, []);

    const imagesRendered = searchedImages.map((url) => {
        return (
            <img
                src={url}
                onClick={() => {
                    if (url === imageUrl) {
                        setImageUrl("");
                    } else {
                        setImageUrl(url);
                    }
                }}
                className={url == imageUrl ? "selected" : "deselected"}
            />
        );
    });

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
                <label>Image Search: </label>
                <span>
                    <form onSubmit={imageSearch}>
                        <input type='text' placeholder='Keyword' className='basic-input' value={imageKeyword} onChange={changeImageKeyword} />
                        <button className='basic-button'>
                            <a>Search</a>
                        </button>
                    </form>
                </span>
                <br />
                <div className='image-results'>{imagesRendered}</div>
            </section>

            <div className='drop-button'>
                <button className='basic-button' onClick={dropMemoryButtonClicked}>
                    Drop the Memory
                </button>
            </div>
        </div>
    );
}
