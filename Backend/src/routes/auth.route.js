import express from "express";
import { signup, login, logout, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const authRouter = express.Router()

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/logout", logout)

authRouter.put("/update-profile", protectRoute, updateProfile);


// just for checking purpose for logout successfully , api testing in postman

authRouter.get("/check", protectRoute, checkAuth);

export default authRouter