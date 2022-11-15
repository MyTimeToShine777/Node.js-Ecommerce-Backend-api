import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a Title"],
        trim: true,
    },
    desc: {
        type: String,
        required: [true, "Please add a Description"],
        trim: true,
    },
    img: {
        type: String,
        required: true,
        trim: true,
    },
    categories: {
        type: Array,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Product", ProductSchema);