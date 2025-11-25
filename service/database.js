const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");
const uuid = require("uuid");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const bcrypt = require("bcryptjs");

const db = client.db("startup");
const usersCollection = db.collection("users");
const roomsCollection = db.collection("rooms");

// try {
//     await db.command({ ping: 1 });
//     console.log(`DB connected to ${config.hostname}`);
// } catch (ex) {
//     console.log(`Error with ${url} because ${ex.message}`);
//     process.exit(1);
// }
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

async function addUser(user) {
    user.token = uuid.v4(); // set cookie when creating user
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    await usersCollection.insertOne(user);
    return user;
}
async function getUser(field, value) {
    if (!value) {
        return null;
    }
    const query = { [field]: value };
    const options = { limit: 1 };
    const user = await usersCollection.findOne(query, options);
    return user;
}
async function setCookie(user, token) {
    user.token = uuid.v4();
    const query = { username: user.username };
    const update = { $set: { token: user.token } };
    await usersCollection.updateOne(query, update);

    return user.token;
}
async function clearCookie(user) {
    const query = { username: user.username };
    const update = { $unset: { token: "" } };
    await usersCollection.updateOne(query, update);
}
async function addRoom(room) {
    // check if room with that name already exists for that user
    const existingRoom = await roomsCollection.findOne({ name: room.name, owner: room.owner });
    if (existingRoom) {
        return false;
    }
    await roomsCollection.insertOne(room);
    return true;
}
async function getRoom(username, roomname) {
    const query = { owner: username, name: roomname };
    const options = { limit: 1 };
    return await roomsCollection.findOne(query, options);
}
async function getAllRooms(username) {
    const query = { owner: username };
    return await roomsCollection.find(query).toArray();
}
async function dropMemory(username, roomname, memory) {
    const query = { owner: username, name: roomname };
    memory.memoryId = uuid.v4();
    memory.likes = 0;
    memory.likeList = [];
    const update = { $push: { memories: memory } }; // will tell the memory to be pushed
    await roomsCollection.updateOne(query, update);

    return memory;
}
async function deleteMemory(username, roomname, id) {
    const query = { owner: username, name: roomname };
    const update = { $pull: { memories: { memoryId: id } } }; // will tell the memory to be pulled
    await roomsCollection.updateOne(query, update);
}
async function changeLikes(username_of_room, roomname, id, liked, username) {
    const query = { owner: username_of_room, name: roomname, "memories.memoryId": id };
    if (liked) {
        const update = { $inc: { "memories.$.likes": 1 }, $push: { "memories.$.likeList": username } };
        await roomsCollection.updateOne(query, update);
    } else {
        const update = { $inc: { "memories.$.likes": -1 }, $pull: { "memories.$.likeList": username } };
        await roomsCollection.updateOne(query, update);
    }
}
module.exports = {
    getUser,
    addUser,
    setCookie,
    clearCookie,
    addRoom,
    getRoom,
    getAllRooms,
    dropMemory,
    deleteMemory,
    changeLikes,
};
