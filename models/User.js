import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a Username"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Provide valid Email",
        ],
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Please add a password"],
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

//Hash Password
UserSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//Generate Token
UserSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, name: this.username, isAdmin: this.isAdmin },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

export default mongoose.model("User", UserSchema);