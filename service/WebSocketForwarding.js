const { WebSocketServer, WebSocket } = require("ws");

const forwardWebSocket = (httpServer) => {
    // Create a websocket object
    const socketServer = new WebSocketServer({ noServer: true });

    httpServer.on("upgrade", (request, socket, head) => {
        socketServer.handleUpgrade(request, socket, head, (ws) => {
            socketServer.emit("connection", ws, request);
        });
    });
    socketServer.on("connection", (socket) => {
        socket.isAlive = true;

        // Forward messages to everyone except the sender
        socket.on("message", function message(data) {
            console.log("received: " + data);
            socketServer.clients.forEach((client) => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

        // Respond to pong messages by marking the connection alive
        socket.on("pong", () => {
            socket.isAlive = true;
        });
    });

    // Periodically send out a ping message to make sure clients are alive
    setInterval(() => {
        socketServer.clients.forEach(function each(client) {
            if (client.isAlive === false) return client.terminate();

            client.isAlive = false;
            client.ping();
        });
    }, 10000);
};

module.exports = { forwardWebSocket };
