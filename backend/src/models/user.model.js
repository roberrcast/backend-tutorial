import mongoose, { Schema } from "mongoose";
/* Install bcrypt and import it to hash/compare passwords */
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, // To trim whitespaces
            minLength: 3,
            maxLength: 30,
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            maxLength: 50,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },

    {
        timestamps: true,
    },
);

/* Before saving any password we need to hash it (hide it from the database?) */
/* Important note: deleted the 'next()' since in newer versions of MongoDB it created problems and is no longer used? Check that */
userSchema.pre("save", async function () {
    /* You don't need to hash the password everytime the user logs in or registers, this line means if your password is not modified it will not hash again, only if it's modified again, we will hash it */
    if (!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
});

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
