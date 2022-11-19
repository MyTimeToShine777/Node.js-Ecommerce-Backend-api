import express from "express";
import { verifyTokenAndAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    updateProduct,
} from "../controllers/productController.js";

//Product routes
router.route("/").post(verifyTokenAndAdmin, createProduct).get(getAllProducts);

router
    .route("/:id")
    .put(verifyTokenAndAdmin, updateProduct)
    .delete(verifyTokenAndAdmin, deleteProduct);

router.route("/find/:id").get(getProduct);

export default router;