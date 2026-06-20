import User from "../models/user.model.js"

import Message from "../models/message.model.js"

import cloudinary from "../config/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        // chat ke sidebar me apan ko users chahiye or ye filteredUsers apan ko chhod ke saare user de dega cause apna kya kaam hai apan toh whatsapp kholenge or kya

        res.status(200).json(filteredUsers);

    }
    catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;    // saamne waali ki id 
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        // message waala ka kaam ye hai ki tum mujhe messages do saare jiska sender or reciever me hu ya woh hai both conditions lagegi tabhi saare msg aayenge

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // Upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // socket.io waali functionality yaha hogi for real-time conversations


        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}