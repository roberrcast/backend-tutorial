import express from "express";

const app = express(); // Create an express app

/* This line gives our server the ability to parse the json requests it gets from the client side */
app.use(express.json());

// Routes import
import userRouter from "./routes/user.route.js";

// Routes declaration
app.use("/api/v1/users", userRouter);

// Example route: http://localhost:4000/api/v1/users/register

export default app;
