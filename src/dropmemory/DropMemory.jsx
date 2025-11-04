import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import "./dropmemory.css";

export default function DropMemory() {
    const { username, roomName } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageKeyword, setImageKeyword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [searchedImages, setSearchedImages] = useState([]);
    const [currentTime, setCurrentTime] = useState("");
    const dropMemoryRef = useRef(null);

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

    const dropMemoryButtonClicked = async () => {
        const memoryData = {
            memory: {
                name: name,
                description: description,
                imageUrl: imageUrl,
                timestamp: currentTime,
            },
        };
        const result = await fetch(`/api/room/drop/${username}/${roomName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(memoryData),
        });
        if (!result.ok) {
            console.error("Failed to drop memory");
            window.alert("Failed to drop memory, only the owner can drop memories in this room");
        }
        navigate(`/room/${username}/${roomName}`);
    };

    const imageSearch = async (event) => {
        // 3rd party API call to Pexels
        event.preventDefault();
        if (imageKeyword == "") {
            setSearchedImages([]);
            return;
        }
        const pexels_api_key = "kLdEN698hYcnPgtwzKS4uOuEarRAtFlAUYDwy2773Sdm3RoaW8d9aVAU";

        const result = await fetch(`https://api.pexels.com/v1/search?query=${imageKeyword}&per_page=4`, {
            method: "GET",
            headers: {
                Authorization: `${pexels_api_key}`,
            },
        });
        const jsonResult = await result.json();
        const images = jsonResult.photos.map((photo) => photo.src.medium);
        console.log("Images:", images);
        setSearchedImages(images);
    };

    useEffect(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleString());
    }, []);
    useEffect(() => {
        if (name == "" || description == "" || imageUrl == "") {
            dropMemoryRef.current.disabled = true;
        } else {
            dropMemoryRef.current.disabled = false;
        }
    }, [name, description, imageUrl]);

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
                key={url}
            />
        );
    });

    return (
        <div className='creation-section'>
            <h1>
                Visited <b>{username}</b>? Record the experience:
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
                <button className='basic-button' onClick={dropMemoryButtonClicked} ref={dropMemoryRef}>
                    Drop the Memory
                </button>
            </div>
        </div>
    );
}
