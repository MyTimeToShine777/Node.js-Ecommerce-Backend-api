import { StatusCodes } from "http-status-codes";
import Order from "../models/Order.js";

//Create Order
//Route /api/order (POST)
//Access Public
const addOrder = async(req, res) => {
    const neworder = req.body;

    const savedorder = await Order.create({
        //To Save to Database Using Spread Operator
        ...neworder,
    });
    res.status(StatusCodes.OK).json(savedorder);
};

//Update Order
//Route /api/cart/id (productId) (PUT)
//Access Private Admin
const updateOrder = async(req, res) => {
    const { id } = req.params;

    const updatedOrder = await Cart.findByIdAndUpdate(
        id, {
            $set: req.body,
        }, {
            new: true,
            runValidators: true,
        }
    );
    res.status(StatusCodes.OK).json(updatedOrder);
};

//Delete Order
//Route /api/cart/id (productId)(DELETE)
//Access Private Admin
const deleteOrder = async(req, res) => {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.status(StatusCodes.OK).json("Order has been deleted...");
};

//Get User Orders
//Route /api/cart/find/id (userId) (GET)
//Access Private
const getOrders = async(req, res) => {
    const { id } = req.params;

    const orders = await Order.find({ userId: id });
    res.status(StatusCodes.OK).json(orders);
};

//Get All Orders
//Route /api/orders/ (GET)
//Access Private Admin
const getAllOrders = async(req, res) => {
    const allOrders = await Order.find();
    res.status(StatusCodes.OK).json(allOrders);
};

//Get Monthly Income
//Route /api/orders/income (GET)
//Access Private Admin
const monthlyIncome = async(req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    const income = await Order.aggregate([
        { $match: { createdAt: { $gte: prevMonth } } },
        {
            $project: { month: { $month: "$createdAt" }, sales: "$amount" },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            },
        },
    ]);
    res.status(StatusCodes.OK).json(income);
};

export {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getAllOrders,
    monthlyIncome,
};