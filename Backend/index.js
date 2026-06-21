import express from "express";
import dotenv from "dotenv"
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import messageRouter from "./src/routes/message.route.js";
import cors from "cors"
import {app,server} from "./src/config/socket.js"

dotenv.config()

// const app = express()

app.use(express.json());
app.use(cookieParser());

// Request send karne ke liye from frontend to backend
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter)

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        server.listen(PORT, () => {
            console.log(`Server running at PORT ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup aborted because MongoDB is unavailable.");
        process.exit(1);
    }
};

startServer();