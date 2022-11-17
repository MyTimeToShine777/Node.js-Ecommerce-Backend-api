import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserSocialSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add a Username"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
    },
    googleId: {
        type: Number,
        require: true,
    },
    avatar: {
        type: String,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

//Generate Token
UserSocialSchema.methods.generateToken = function() {
    return jwt.sign({ id: this._id, name: this.username, isAdmin: this.isAdmin },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
};

export default mongoose.model("UserSocial", UserSocialSchema);