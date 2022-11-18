import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { ForbiddenError, UnauthenticatedError } from "../errors/errors.js";

const verifyToken = async(req, res, next) => {
    const authHeader = req.rawHeaders[1];

    let token;
    if (authHeader) {
        try {
            //Get Token from Header
            token = authHeader.split(" ")[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //Get User from the Token
            req.user = await User.findById(decoded.id);

            // console.log(req.user);
            next();
        } catch (error) {
            console.log(error);
            throw new UnauthenticatedError("Not Authorized, Token is not Valid!");
        }
    }

    if (!token) {
        throw new UnauthenticatedError("Not Authorized, No Token");
    }
};
//For User info Update
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken;

    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        throw new ForbiddenError("You have no Access");
    }
};

//For Admin Update
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken;

    if (req.user.isAdmin) {
        next();
    } else {
        throw new ForbiddenError("You have no Access");
    }
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };