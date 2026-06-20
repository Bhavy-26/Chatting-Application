import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getUsersForSidebar , getMessage , sendMessage} from "../controllers/message.controller.js"

const messageRouter = express.Router()

messageRouter.get("/users",protectRoute,getUsersForSidebar)   // sidebar waale bande aajaye screen pe

messageRouter.get("/:id",protectRoute,getMessage)     // kisi bhi bande pe click karu toh uske or mere messages aajaye screen pe

messageRouter.post("/send/:id",protectRoute,sendMessage)

export default messageRouter