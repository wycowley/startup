import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "50px" }}>
            <h1 style={{ width: "100vw", textAlign: "center" }}>404 Not Found</h1>
            <button onClick={() => navigate(-1)} className='basic-button' style={{ fontSize: "1.5rem" }}>
                Go Back
            </button>
        </div>
    );
}
