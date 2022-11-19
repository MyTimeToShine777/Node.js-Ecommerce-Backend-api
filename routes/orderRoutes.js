import express from "express";
const router = express.Router();

import {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} from "../middleware/authMiddleware.js";

import {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    getAllOrders,
    monthlyIncome,
} from "../controllers/orderController.js";

//Order Routes
router.route("/").post(addOrder).get(verifyTokenAndAdmin, getAllOrders);

router
    .route("/:id")
    .put(verifyTokenAndAdmin, updateOrder)
    .delete(verifyTokenAndAdmin, deleteOrder);

router.route("/find/:id").get(verifyTokenAndAuthorization, getOrders);

router.route("/income").get(verifyTokenAndAdmin, monthlyIncome);

export default router;