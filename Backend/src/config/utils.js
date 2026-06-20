import jwt from "jsonwebtoken"

export const generateToken = async (userId, res) => {
    // jwt.sign requires a plain object as payload when using ESM; wrap the id
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // MS
        httpOnly: true, // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV === "production",
    })

    return token;
}