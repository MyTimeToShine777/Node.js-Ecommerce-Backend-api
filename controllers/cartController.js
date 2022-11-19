import { StatusCodes } from "http-status-codes";
import Cart from "../models/Cart.js";

//Create Product
//Route /api/carts (POST)
//Access Public
const addCart = async(req, res) => {
    const newcart = req.body;

    const savedCart = await Cart.create({
        ...newcart,
    });
    res.status(StatusCodes.OK).json(savedCart);
};

//Update Cart
//Route /api/carts/id (productId) (PUT)
//Access Private
const updateCart = async(req, res) => {
    const { id } = req.params;

    const updatedCart = await Cart.findByIdAndUpdate(
        id, {
            $set: req.body,
        }, {
            new: true,
            runValidators: true,
        }
    );
    res.status(StatusCodes.OK).json(updatedCart);
};

//Delete Cart
//Route /api/carts/id (productId)(DELETE)
//Access Private
const deleteCart = async(req, res) => {
    const { id } = req.params;

    await Cart.findByIdAndDelete(id);

    res.status(StatusCodes.OK).json("Cart has been deleted...");
};

//Get User Cart
//Route /api/carts/find/id (userId) (GET)
//Access Private
const getCart = async(req, res) => {
    const { id } = req.params;
    const cart = await Cart.findOne({ userId: id });
    res.status(StatusCodes.OK).json(cart);
};

//Get All Cart
//Route /api/carts/ (GET)
//Access Private Admin
const getAllCarts = async(req, res) => {
    const carts = await Cart.find();
    res.status(StatusCodes.OK).json(carts);
};

export { addCart, updateCart, deleteCart, getCart, getAllCarts };