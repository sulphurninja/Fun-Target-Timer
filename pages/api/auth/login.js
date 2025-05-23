import connectDB from "../../../utils/connectDB";
import Users from '../../../models/userModel'
import bcrypt from 'bcrypt'
import { createAccessToken, createRefreshToken } from '../../../utils/generateToken'

export default async (req, res) => {
    console.log("Login API route started");
    try {
        // Log environment info (but sanitize any sensitive data)
        console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
        console.log(`MongoDB URL exists: ${!!process.env.MONGODB_URL}`);

        // Log attempt to connect
        console.log("Attempting database connection...");
        try {
            await connectDB();
            console.log("Database connection successful");
        } catch (dbError) {
            console.error("Database connection failed:", dbError);
            return res.status(503).json({
                err: "Database connection failed. Please try again later.",
                details: process.env.NODE_ENV === 'development' ? dbError.message : undefined
            });
        }
        switch (req.method) {
            case "POST":
                await login(req, res);
                break;
            default:
                return res.status(405).json({ err: "Method not allowed" });
        }
    } catch (err) {
        console.error("API route error:", err);
        return res.status(500).json({ err: "Database connection failed" });
    }
}

const login = async (req, res) => {
    try {
        const { userName, password } = req.body

        // Remove this line - it's unnecessary
        // const passwordHash = await bcrypt.hash(password, 12)

        const user = await Users.findOne({ userName })
        if (!user) return res.status(400).json({ err: 'You are not registered!' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ err: 'Incorrect Password, Check again!' })

        const access_token = createAccessToken({ id: user._id })
        const refresh_token = createRefreshToken({ id: user._id })

        res.json({
            msg: "Login Successful!!",
            refresh_token,
            access_token,
            user: {
                userName: user.userName,
                role: user.role,
                root: user.root
            }
        })

    } catch (err) {
        console.error("Login function error:", err);
        return res.status(500).json({ err: err.message })
    }
}
