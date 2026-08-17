import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the user already exists
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: "User alrady exists" });
        }

        // Create a user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,
        });

        // Response when the user is created successfully
        res.status(201).json({
            message: "User registered",
            /* The _id is the unique id given by MongoDB */
            user: { id: user._id, email: user.email, username: user.username },
        });
    } catch (error) {
        /* Code 500 means 'internal server error' nothing is wrong on the user's side but on our server */
        res.status(500).json({
            message: "Internal server error:",
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        // Checking if the user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        // If user doesn't exist
        if (!user)
            return res.status(400).json({
                message: "User not found",
            });

        // Compare the passwords
        const isMatch = await user.comparePassword(password);

        if (!isMatch)
            return res.status(400).json({
                message: "Invalid credentials",
            });

        // Passwords match and successfully login
        res.status(200).json({
            message: "User logged in",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({
            email,
        });

        if (!user)
            return res.status(404).json({
                message: "User not found",
            });

        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};

export { registerUser, loginUser, logoutUser };
