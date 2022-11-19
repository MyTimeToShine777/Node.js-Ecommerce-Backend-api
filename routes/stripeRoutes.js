import express from "express";
const router = express.Router();

import stripePayment from "../controllers/stripe.js";

//Stripe Routes
router.route("/payment").post(stripePayment);

export default router;