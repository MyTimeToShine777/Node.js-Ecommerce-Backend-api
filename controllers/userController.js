import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError } from "../errors/errors.js";
import { UnauthenticatedError, ForbiddenError } from "../errors/errors.js";
import bcrypt from "bcryptjs";

//Update User Details
//Route /api/users/id (PUT)
//Access Private
const updateUserInfo = async(req, res) => {
    const { id } = req.params;

    //Check for login user
    if (!req.user) {
        throw new UnauthenticatedError("User Not Found");
    }

    if (req.body.password) {
        //Hash Password
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
        id, {
            $set: req.body,
        }, {
            new: true,
        }
    );
    res.status(StatusCodes.OK).json(updatedUser);
};

//Delete User Details
//Route /api/users/id (DELETE)
//Access Private
const deleteUser = async(req, res) => {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    res.status(StatusCodes.OK).json("User has been deleted...");
};

//Get User Details
//Route /api/users/id (GET)
//Access Private
const getUser = async(req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    //For combining user and token
    let userData = {...user._doc };
    let Data = {
        ...userData,
    };

    res.status(StatusCodes.OK).json(Data);
};

//Get All User Details
//Route /api/users/ (GET)
//Access Private
const getAllUsers = async(req, res) => {
    const query = req.query.new;

    const users = query ?
        await User.find().sort({ _id: -1 }).limit(5) :
        await User.find();

    res.status(StatusCodes.OK).json(users);
};

//Get All User Details
//Route /api/users/stats (GET)
//Access Private
const statsUsers = async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);

    res.status(StatusCodes.OK).json(data);
};

export { updateUserInfo, deleteUser, getUser, getAllUsers, statsUsers };