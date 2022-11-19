import { StatusCodes } from "http-status-codes";
import Product from "../models/Product.js";

import { NotFoundError } from "../errors/errors.js";

//Create Product
//Route /api/products (POST)
//Access Private Admin
const createProduct = async(req, res) => {
    const products = req.body;

    const savedProduct = await Product.create({
        ...products,
    });
    res.status(StatusCodes.OK).json(savedProduct);
};

//Update Product
//Route /api/product/id (productId)(PUT)
//Access Private Admin
const updateProduct = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new NotFoundError("Product Not Found");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
        id, {
            $set: req.body,
        }, {
            new: true,
            runValidators: true,
        }
    );
    if (!updatedProduct) {
        throw new NotFoundError(`No Product with ID: ${id}`);
    }
    res.status(StatusCodes.OK).json(updatedProduct);
};

//Delete Product
//Route /api/products/id (productId) (DELETE)
//Access Private Admin
const deleteProduct = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new NotFoundError("Product Not Found");
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new NotFoundError(`No Product with ID: ${id}`);
    }

    res.status(StatusCodes.OK).json("Product has been deleted...");
};

//Get Product
//Route /api/products/find/id (productId)(GET)
//Access Public
const getProduct = async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        throw new NotFoundError(`No Product with ID: ${id}`);
    }
    res.status(StatusCodes.OK).json(product);
};

//Get All Products
//Route /api/products/ (GET)
//Access Public
const getAllProducts = async(req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    let products;

    if (qNew) {
        products = await Product.find().sort({ _id: -1 }).limit(5);
    } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            },
        });
    } else {
        products = await Product.find();
    }

    res.status(StatusCodes.OK).json(products);
};

export {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
};