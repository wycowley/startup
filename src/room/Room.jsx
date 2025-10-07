import React from "react-js";
import "./room.css";

export default function Room() {
    return (
        <div>
            <section class='title-section'>
                <h1 class='title'>User's Room</h1>
                <div>
                    <button class='basic-button'>
                        <a href='/dropmemory.html'>Drop a Memory</a>
                    </button>
                    <button class='basic-button'>
                        <a href='/index.html'>Go Home</a>
                    </button>
                </div>
            </section>

            <section class='card-container'>
                <div class='card'>
                    <p class='timestamp'>
                        Sep. 9 9:34 PM <button>×</button>
                    </p>
                    <img src='https://prodimage.images-bn.com/pimages/9780063398344_p0_v2_s1200x630.jpg' />

                    <div class='description'>
                        <p>Watched wicked together and it was pretty fun</p>
                        <p>Posted by: User</p>
                    </div>
                </div>
                <div class='card'>
                    <p class='timestamp'>
                        Sep. 3 5:24 PM <button>×</button>
                    </p>
                    <img src='https://a1.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fffl.png' />
                    <div class='description'>
                        <p>Doing a fantasy football draft</p>
                        <p>Posted by: User</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
