const Event = {
    System: "system",
    Like: "like",
    Delete: "delete",
    Add: "add",
};
class EventMessage {
    from;
    type;
    value;

    constructor(from, type, value) {
        this.from = from;
        this.type = type;
        this.value = value;
    }
}
class WebSocketHandler {
    handlers = [];

    constructor() {
        let port = window.location.port;
        const protocol = window.location.protocol === "http:" ? "ws" : "wss";

        if (port === "5173" || port === "3000") {
            port = "4000";
        }

        this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
        this.socket.onopen = (event) => {
            this.receiveEvent(new EventMessage("DropAMemory", Event.System, { msg: "connected" }));
        };
        this.socket.onclose = (event) => {
            this.receiveEvent(new EventMessage("DropAMemory", Event.System, { msg: "disconnected" }));
        };
        this.socket.onmessage = async (msg) => {
            try {
                const event = JSON.parse(await msg.data.text());
                this.receiveEvent(event);
            } catch {}
        };
    }
    broadcastEvent(from, type, value) {
        console.log("Broadcasting WebSocket event:", from, type, value);
        const event = new EventMessage(from, type, value);
        this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    removeHandler(handler) {
        this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(event) {
        this.handlers.forEach((handler) => {
            console.log("WebSocket event received:", event);
            handler(event);
        });
    }
}
const WebSocketHandlerInstance = new WebSocketHandler();
export { WebSocketHandlerInstance as WebSocketHandler, Event, EventMessage };
