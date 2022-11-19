import express from "express";
const router = express.Router();

import {
    updateUserInfo,
    deleteUser,
    getUser,
    getAllUsers,
    statsUsers,
} from "../controllers/userController.js";

import {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from "../middleware/authMiddleware.js";

//User Routes
router
    .route("/:id")
    .put(verifyTokenAndAuthorization, updateUserInfo)
    .delete(verifyTokenAndAuthorization, deleteUser);
router.route("/find/:id").get(verifyTokenAndAdmin, getUser);
router.route("/").get(verifyTokenAndAdmin, getAllUsers);
router.route("/stats").get(verifyTokenAndAdmin, statsUsers);

export default router;