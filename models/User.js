import mongoose from "mongoose";

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

export default mongoose.model("User", UserSchema);