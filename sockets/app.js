import { Server, Socket } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

let onlineUsers = [];

const addUser = (userId, socketId) => {
    const userExists = onlineUsers.find((user) => user.userId === userId);
    if (!userExists) {
        onlineUsers.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    console.log(onlineUsers)
    return onlineUsers.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log(`User connected: ${userId}, Socket ID: ${socket.id}`);
        console.log('Online Users:', onlineUsers);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
        } else {
            console.log(`Receiver not found: ${receiverId}`);
        }
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
        console.log(`User disconnected: Socket ID: ${socket.id}`);
        console.log('Online Users:', onlineUsers);
    });
});

io.listen("4000");
