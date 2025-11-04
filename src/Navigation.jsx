import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const [roomId, setRoomId] = useState("");
    const buttonRef = useRef(null);
    const logOutButtonRef = useRef(null);

    const updateRoomId = (event) => {
        setRoomId(event.target.value);
    };

    useEffect(() => {
        if (roomId == "") {
            buttonRef.current.disabled = true;
        } else {
            buttonRef.current.disabled = false;
        }
    }, [roomId]);

    useEffect(() => {
        // now going to check if there is a current user
        // if there is, show the log out button
        const result = fetch("/api/user/me", {
            method: "GET",
        }).then((res) => {
            if (res.ok) {
                logOutButtonRef.current.style.display = "inline-block";
            } else {
                logOutButtonRef.current.style.display = "none";
            }
        });
    }, [location]);

    const onFormSubmit = (e) => {
        e.preventDefault();

        navigate(`/room/${roomId}`);
    };
    const logOut = async () => {
        const result = await fetch("/api/auth", {
            method: "DELETE",
        });
        if (result.ok) {
            navigate("/");
        } else {
            window.alert("Failed to log out");
        }
    };

    return (
        <header>
            <nav>
                <h1>
                    Drop a Memory{" "}
                    <button className='basic-button' onClick={logOut} style={{ fontSize: "1rem", verticalAlign: "middle" }} ref={logOutButtonRef}>
                        Log out
                    </button>
                </h1>
                <form onSubmit={onFormSubmit} className='room-selector'>
                    <label>Go to room: </label>
                    <input type='text' placeholder='Room ID' className='basic-input' value={roomId} onChange={updateRoomId} />
                    <button className='basic-button' type='submit' ref={buttonRef}>
                        Go
                    </button>
                </form>
            </nav>
        </header>
    );
}
