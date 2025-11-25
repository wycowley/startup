const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const uuid = require("uuid");
const app = express();

const pexels_api_key = "kLdEN698hYcnPgtwzKS4uOuEarRAtFlAUYDwy2773Sdm3RoaW8d9aVAU";

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const DB = require("./database.js");

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

app.use((_req, res) => {
    res.sendFile("index.html", { root: "public" });
});

// const verifyToken()

// create account
apiRouter.post("/auth", async (req, res) => {
    const { username, password } = req.body;
    const userReturned = await DB.getUser("username", username);
    console.log(userReturned);
    if (userReturned != null) {
        // already has an account for that username
        // return an error then?
        res.status(409).send({ msg: "Existing user" });
    } else {
        const user = await DB.addUser({ username: username, password: password });
        res.cookie("token", user.token, {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
        });
        res.send({ username: user.username });
    }
});
// login
apiRouter.put("/auth", async (req, res) => {
    const { username, password } = req.body;
    const user = await DB.getUser("username", username);
    console.log(user);
    console.log("Comparing passwords:", await bcrypt.compare(password, user.password));
    if (user != null && (await bcrypt.compare(password, user.password))) {
        console.log("User authenticated:", user);
        const newToken = await DB.setCookie(user);
        res.cookie("token", newToken, {
            secure: true,
            httpOnly: true,
            sameSite: "strict",
        });
        res.send({ username: user.username });
    } else {
        console.log("Authentication failed for user:", username);
        res.status(401).send({ msg: "Unauthorized" });
    }
});
apiRouter.delete("/auth", async (req, res) => {
    const token = req.cookies["token"];
    console.log("Logging out token:", token);
    const user = await DB.getUser("token", token);
    console.log("Logging out user:", user);
    if (user) {
        await DB.clearCookie(user);
    }
    console.log("Logging out user:", user);
    res.clearCookie("token");
    res.send({});
});
apiRouter.get("/user/me", async (req, res) => {
    const token = req.cookies["token"];
    if (!token) {
        res.status(401).send({ msg: "No user logged in" });
        return;
    }
    const user = await DB.getUser("token", token);
    console.log("Getting current user:", user);
    if (user != null) {
        res.send({ username: user.username });
    } else {
        res.status(401).send({ msg: "No user logged in" });
    }
});
apiRouter.post("/room/create", async (req, res) => {
    const token = req.cookies["token"];
    const user = await DB.getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }
    const { roomName, allowAnyone } = req.body;
    if (await DB.addRoom({ name: roomName, allowAnyone: allowAnyone, owner: user.username, memories: [] })) {
        res.send({ msg: "Room created", username: user.username });
        return;
    }
    res.status(401).send({ msg: "You already have a room with that name" });
});
// drop a memory in a room
apiRouter.post("/room/drop/:username/:roomName", async (req, res) => {
    const { memory } = req.body;
    const { username, roomName } = req.params;
    const room = await DB.getRoom(username, roomName);
    if (room == null) {
        res.status(404).send({ msg: "Room not found" });
        return;
    }
    // if the room does not allow for anyone to drop memories, check authorization
    if (!room.allowAnyone) {
        console.log("Room does not allow anyone to drop memories, checking authorization");
        const token = req.cookies["token"];
        const user = await DB.getUser("token", token);
        if (user == null) {
            res.status(401).send({ msg: "Unauthorized" });
            return;
        }
        if (room.owner !== user.username) {
            res.status(403).send({ msg: "Forbidden" });
            return;
        }
    }
    await DB.dropMemory(username, roomName, memory);
    res.send({ msg: "Memory dropped" });
});
// get memories in a room
apiRouter.get("/room/:username/:roomName", async (req, res) => {
    const { username, roomName } = req.params;
    const room = await DB.getRoom(username, roomName);
    if (!room) {
        res.status(404).send({ msg: "Room not found" });
        return;
    }
    const token = req.cookies["token"];
    const user = await DB.getUser("token", token);

    if (user) {
        room.memories.forEach((memory) => {
            if (memory.likeList && memory.likeList.includes(user.username)) {
                memory.liked = true;
            } else {
                memory.liked = false;
            }
            memory.likeList = undefined;
        });
    }

    res.send({ memories: room.memories, allowAnyone: room.allowAnyone, hostLoggedIn: user && user.username === username });
});
apiRouter.post("/room/like/:username/:roomName/:memoryId", async (req, res) => {
    const { username, roomName, memoryId } = req.params;
    const { liked } = req.body;
    const token = req.cookies["token"];
    console.log("Token from cookie:", token);
    const user = await DB.getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    } else {
        console.log("User changing like status:", user);
    }
    const room = await DB.getRoom(username, roomName);
    if (room == null) {
        res.status(404).send({ msg: "Room not found" });
        return;
    }
    await DB.changeLikes(username, roomName, memoryId, liked, user.username);
    res.send({ msg: "Like status changed" });
});
// delete a memory in a room
apiRouter.delete("/room/delete/:username/:roomName/:memoryId", async (req, res) => {
    const { memoryId, roomName, username } = req.params;
    const token = req.cookies["token"];
    const user = await DB.getUser("token", token);
    if (user == null) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }
    const room = await DB.getRoom(username, roomName);
    if (room == null) {
        res.status(404).send({ msg: "Room not found" });
        return;
    }
    console.log("User deleting memory:", user);
    console.log("Room owner:", username);
    if (room.owner !== user.username) {
        res.status(403).send({ msg: "Forbidden" });
        return;
    }
    console.log("Trying to delete memory:", memoryId);
    // don't need to check if you are the owner since only the owner can have a room with that name
    await DB.deleteMemory(user.username, roomName, memoryId);
    res.send({ msg: "Memory deleted" });
});
// get rooms for a user
apiRouter.get("/rooms/available", async (req, res) => {
    const token = req.cookies["token"];
    const user = await DB.getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }
    const userRooms = await DB.getAllRooms(user.username);
    res.send({ rooms: userRooms });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
