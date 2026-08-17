import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connect to the database
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}`, // Extracted from .env file, the string
        );
        // Print to the console what is the connection host
        console.log(
            `\n MongoDB connected! Host: ${connectionInstance.connection.host}`,
        );
    } catch (error) {
        // If errors, print why
        console.log("MongoDB connection failed", error);
        // Exit the program after the process is finished
        process.exit(1);
    }
};

export default connectDB;
