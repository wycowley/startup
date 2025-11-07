const { MongoClient } = require("mongodb");
const config = require("./dbConfig.json");

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db("startup");
const usersCollection = db.collection("users");
const roomsCollection = db.collection("rooms");
const uuid = require("uuid");

try {
    await db.command({ ping: 1 });
    console.log(`DB connected to ${config.hostname}`);
} catch (ex) {
    console.log(`Error with ${url} because ${ex.message}`);
    process.exit(1);
}

async function addUser(user) {
    await usersCollection.insertOne(user);
}
async function getUser(field, value) {
    const query = { field: value };
    const options = { limit: 1 };
    return await usersCollection.find(query, options);
}
async function setCookie(user, token) {
    user.token = uuid.v4();
    const query = { username: user.username };
    const update = { $set: { token: user.token } };
    await usersCollection.updateOne(query, update);
}
async function clearCookie(user) {
    const query = { username: user.username };
    const update = { $unset: { token: "" } };
    await usersCollection.updateOne(query, update);
}
async function addRoom(room) {
    await roomsCollection.insertOne(room);
}
async function getRoom(username, roomname) {
    const query = { owner: username, name: roomname };
    const options = { limit: 1 };
    return await roomsCollection.find(query, options);
}
async function getAllRooms(username) {
    const query = { owner: username };
    return await roomsCollection.find(query).toArray();
}
async function dropMemory(username, roomname, memory) {
    const query = { owner: username, name: roomname };
    const update = { $push: { memories: memory } }; // will tell the memory to be pushed
    await roomsCollection.updateOne(query, update);
}
async function deleteMemory(username, roomname, id) {
    const query = { owner: username, name: roomname };
    const update = { $pull: { memories: { memoryId: id } } }; // will tell the memory to be pulled
    await roomsCollection.updateOne(query, update);
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
};
