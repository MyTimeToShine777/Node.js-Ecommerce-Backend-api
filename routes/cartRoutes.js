import express from "express";
const router = express.Router();
import {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from "../middleware/authMiddleware.js";

import {
    addCart,
    deleteCart,
    updateCart,
    getCart,
    getAllCarts,
} from "../controllers/cartController.js";

//Cart Routes
router.route("/").post(addCart).get(verifyTokenAndAdmin, getAllCarts);
router
    .route("/:id")
    .put(verifyTokenAndAuthorization, updateCart)
    .delete(verifyTokenAndAuthorization, deleteCart);

router.route("/find/:id").get(verifyTokenAndAuthorization, getCart);

export default router;