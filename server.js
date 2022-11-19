//Package imports
import path from "path";
import { fileURLToPath } from "url";
import "express-async-errors";
import colors from "colors";
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import cookieSession from "cookie-session";
import cors from "cors";
import session from "express-session";

//File imports
import connectDB from "./db/connect.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import "./controllers/passport.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMidddleware from "./middleware/errorHandlerMidddleware.js";
import { verifyToken } from "./middleware/authMiddleware.js";

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie-Sessions
let sess = {
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 100 },
};

if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}

app.use(session(sess));
// app.use(
//     cookieSession({
//         name: "session",
//         keys: ["pugazh"],
//         maxAge: 24 * 60 * 60 * 100,
//     })
// );

//Passport Library
app.use(passport.initialize());
app.use(passport.session());

//Cors;
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", verifyToken, userRoutes);
app.use("/api/products", verifyToken, productRoutes);
app.use("/api/carts", verifyToken, cartRoutes);
app.use("/api/orders", verifyToken, orderRoutes);
app.use("/api/checkout", stripeRoutes);

//ErrorMiddleware
app.use(notFoundMiddleware);
app.use(errorHandlerMidddleware);

//Server
const PORT = process.env.PORT || 5000;
const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(
            PORT,
            console.log(`Server listening on Port ${PORT}...`.bgCyan.bold)
        );
    } catch (error) {
        console.log(error);
    }
};

start();