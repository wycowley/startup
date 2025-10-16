import React, { useEffect } from "react";
import "./room.css";
import { NavLink, useParams, useNavigate } from "react-router-dom";

export default function Room() {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = `Room: ${id}`;
    }, [id]);
    return (
        <div>
            <section className='title-section'>
                <h1 className='title'>User's Room</h1>
                <div>
                    <button className='basic-button' onClick={() => navigate("/dropmemory")}>
                        Drop a Memory
                    </button>
                    <button className='basic-button' onClick={() => navigate("/")}>
                        Go Home
                    </button>
                </div>
            </section>

            <section className='card-container'>
                <div className='card'>
                    <p className='timestamp'>
                        Sep. 9 9:34 PM <button>×</button>
                    </p>
                    <img src='https://prodimage.images-bn.com/pimages/9780063398344_p0_v2_s1200x630.jpg' />

                    <div className='description'>
                        <p>Watched wicked together and it was pretty fun</p>
                        <p>Posted by: User</p>
                    </div>
                </div>
                <div className='card'>
                    <p className='timestamp'>
                        Sep. 3 5:24 PM <button>×</button>
                    </p>
                    <img src='https://a1.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fffl.png' />
                    <div className='description'>
                        <p>Doing a fantasy football draft</p>
                        <p>Posted by: User</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
