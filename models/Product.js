import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a Title"],
        trim: true,
        unique: true,
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
        type: Array,
    },
    color: {
        type: Array,
    },
    price: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Product", ProductSchema);