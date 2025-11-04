const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();

const pexels_api_key = "kLdEN698hYcnPgtwzKS4uOuEarRAtFlAUYDwy2773Sdm3RoaW8d9aVAU";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const users = [];
const rooms = [];

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.get("/search", async (req, res) => {
    console.log("Search API called");

    const searchTerm = req.query.searchTerm;

    const result = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&per_page=4`, {
        method: "GET",
        headers: {
            Authorization: `${pexels_api_key}`,
        },
    });
    console.log(result);
    const returnedJson = await result.json();
    const images = returnedJson.photos.map((photo) => photo.src.medium);
    console.log("API returning images:");
    console.log(images);

    res.json(images);
});
// create account
apiRouter.post("/auth", async (req, res) => {
    const { username, password } = req.body;
    if (getUser("username", username)) {
        // already has an account for that username
        // return an error then?
        res.status(409).send({ msg: "Existing user" });
    } else {
        const user = await createUser(username, password);
        setCookie(res, user); // create and set cookie

        res.send({ username: user.username });
    }
});
// login
apiRouter.put("/auth", async (req, res) => {
    const { username, password } = req.body;
    const user = getUser("username", username);
    if (user && (await bcrypt.compare(password, user.password))) {
        setCookie(res, user);
        res.send({ username: user.username });
    } else {
        res.status(401).send({ msg: "Unauthorized" });
    }
});
apiRouter.delete("/auth", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (user) {
        clearCookie(res, user);
    }
    res.send({});
});
apiRouter.get("/user/me", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (user) {
        res.send({ username: user.username });
    } else {
        res.status(401).send({ msg: "No user logged in" });
    }
});
const createUser = async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        username: username,
        password: hashedPassword,
    };
    users.push(user);
    return user;
};

// can work for either passwords or username
const getUser = (key, value) => {
    if (value) {
        return users.find((user) => user[key] === value);
    }
    return null;
};

const setCookie = (res, user) => {
    user.token = uuid.v4();

    res.cookie("token", user.token, {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
    });
};

const clearCookie = (res, user) => {
    delete user.token; // gets rid of the field of token
    res.clearCookie("token");
};
// create a room
apiRouter.post("/room/create", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }
    const { roomName, allowAnyone } = req.body;
    if (createRoom(roomName, allowAnyone, user.username)) {
        res.send({ msg: "Room created", username: user.username });
        return;
    }
    res.status(401).send({ msg: "You already have a room with that name" });
});
// drop a memory in a room
apiRouter.post("/room/drop", async (req, res) => {
    const { roomName, memory } = req.body;
    const room = rooms.find((r) => r.name === roomName);
    if (!room) {
        res.status(404).send({ msg: "Room not found" });
        return;
    }
    // if the room does not allow for anyone to drop memories, check authorization
    if (!room.allowAnyone) {
        const token = req.cookies["token"];
        const user = await getUser("token", token);
        if (!user) {
            res.status(401).send({ msg: "Unauthorized" });
            return;
        }
        if (room.owner !== user.username) {
            res.status(403).send({ msg: "Forbidden" });
            return;
        }
    }
    room.memories.push({ ...memory, memoryId: uuid.v4() }); // set a unique id for the memory so it can be deleted properly
    res.send({ msg: "Memory dropped" });
});
// get memories in a room
apiRouter.get("/room/:username/:roomName", async (req, res) => {
    const { username, roomName } = req.params;
    const room = rooms.find((r) => r.name === roomName && r.owner === username);
    if (!room) {
        res.status(404).send({ msg: "Room not found" });
        return;
    }
    res.send({ memories: room.memories });
});
// delete a memory in a room
apiRouter.delete("/room/delete/:username/:roomName/:memoryId", async (req, res) => {
    const { memoryId, roomName, username } = req.params;
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }
    const room = rooms.find((r) => r.name === roomName && r.owner === username);
    if (!room) {
        res.status(404).send({ msg: "Room not found" });
        return;
    }
    // don't need to check if you are the owner since only the owner can have a room with that name
    room.memories.remove((memory) => memory.memoryId === memoryId);
    res.send({ msg: "Memory deleted" });
});
// get rooms for a user
apiRouter.get("/rooms/available", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }
    const userRooms = rooms.filter((r) => r.owner === user.username);
    res.send({ rooms: userRooms });
});
const createRoom = (roomName, allowAnyone, ownerUsername) => {
    if (rooms.find((room) => room.name === roomName && room.owner === ownerUsername)) {
        return null; // room already exists
    }
    const room = {
        name: roomName,
        allowAnyone: allowAnyone,
        owner: ownerUsername,
        memories: [],
    };
    rooms.push(room);
    return room;
};

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
