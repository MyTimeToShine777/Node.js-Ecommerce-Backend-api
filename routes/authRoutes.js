import express from "express";
const router = express.Router();

import {
    registerUser,
    loginUser,
    googleProfileAuthenticate,
    googleAuthenticate,
    githubProfileAuthenticate,
    githubAuthenticate,
    error,
    success,
} from "../controllers/authController.js";

//GoogleSocial controllers
router.route("/google").get(googleProfileAuthenticate);
router.route("/google/callback").get(googleAuthenticate);

//GitHub Social Controllers
router.route("/github").get(githubProfileAuthenticate);
router.route("/github/callback").get(githubAuthenticate);

//Social Success Routes
router.route("/success").get(success);
router.route("/error").get(error);

//User auth Controllers
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;