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
apiRouter.put("/auth", async (req, res) => {
    const { username, password } = req.body;
    const user = getUser("username", username);
    if (user && (await bcrypt.compare(password, user.password))) {
        setCookie(res, user);
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
        res.status(401).send({ msg: "Unauthorized" });
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

// endpoint to drop a memory (maybe need to be authorized)
// endpoint to delete a memory (need to be authorized)
// endpoint to get memories for a certain room (not authorized)
// endpoint to create a room (authorized)
apiRouter.post("/room/create", async (req, res) => {
    const token = req.cookies["token"];
    const user = await getUser("token", token);
    if (!user) {
        res.status(401).send({ msg: "Unauthorized" });
        return;
    }
    const { roomName, allowAnyone } = req.body;
    createRoom(roomName, allowAnyone, user.username);
    res.send({ msg: "Room created" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
