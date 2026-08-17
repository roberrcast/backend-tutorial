import mongoose from "mongoose";
import { User } from "./src/models/user.model.js";

async function test() {
    await mongoose.connect("mongodb://localhost:27017/intro_to_backend");
    const user = await User.findOne({ email: "rob@gmail.com" });
    console.log("User password from DB:", user.password);
    console.log("Password length:", user.password.length);
    const match = await user.comparePassword("123456");
    console.log("Does it match?", match);
    process.exit(0);
}

test();
