import { Server } from "socket.io"
import http from "http"
import express from "express"

const app = express();
const server = http.createServer(app)




const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
})


export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}


// Implementing onlineUsers
const userSocketMap = {};          // used to store online users 
// {userId : SocketId} iss object ke andar



io.on("connection", (socket) => {
    console.log("A user Connected", socket.id)

    const userId = socket.handshake.query.userId;

    if (userId)
        userSocketMap[userId] = socket.id;

    // io.emit() is used to send events to all connected clients

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A user Disconnected", socket.id)
        // Only clear the mapping if this socket is still the active one for the user.
        if (userId && userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId]
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })

})

export { io, app, server }