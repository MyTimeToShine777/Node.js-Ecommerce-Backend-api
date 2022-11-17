import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { BadRequestError } from "../errors/errors.js";
import { UnauthenticatedError } from "../errors/errors.js";
import passport from "passport";
const CLIENT_URL = "http://localhost:3000";

//Google Social Authenticate
const googleProfileAuthenticate = passport.authenticate("google", {
    scope: ["profile"],
});

const googleAuthenticate = passport.authenticate("google", {
    successRedirect: "/api/auth/success",

    failureRedirect: "/api/auth/error",
});
//GitHub Social Authenticate
const githubProfileAuthenticate = passport.authenticate("github", {
    scope: ["profile"],
});

const githubAuthenticate = passport.authenticate("github", {
    successRedirect: "/api/auth/success",

    failureRedirect: "/api/auth/error",
});

//Routes for Social Data
const success = async(req, res) => {
    if (req.user) {
        res.status(StatusCodes.OK).json({
            sucsess: true,
            message: "Successfull",
            user: req.user,
        });
    }
};

const error = async(req, res) => {
    res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "failure",
    });
};

//Desc Register New User
//Route /api/users (POST)
//Access Public
const registerUser = async(req, res) => {
    const { username, email, password } = req.body;

    //Check for User Exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new UnauthenticatedError("User Already Exists");
    }

    //Creating User
    const user = await User.create({
        username,
        email,
        password,
    });

    //Generate Token
    const accesstoken = user.generateToken();

    //For combining user and token
    let userData = {...user._doc };
    let Data = {
        ...userData,
        accesstoken,
    };

    if (user) {
        res.status(StatusCodes.CREATED).json(Data);
    } else {
        throw new BadRequestError("Invalid User Data");
    }
};

//Desc Authenticate New User
//Route /api/auth/login (POST)
//Access Public
const loginUser = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError("Please Provide Email and Password");
    }
};

export {
    googleProfileAuthenticate,
    googleAuthenticate,
    githubProfileAuthenticate,
    githubAuthenticate,
    success,
    error,
    registerUser,
    loginUser,
};