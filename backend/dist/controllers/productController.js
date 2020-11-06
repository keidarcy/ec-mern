"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.updateProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
const getProducts = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const products = yield productModel_1.default.find({});
    res.json(products);
}));
exports.getProducts = getProducts;
const getProductById = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}));
exports.getProductById = getProductById;
const deleteProduct = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        yield product.remove();
        res.json({ message: 'PRODUCT REMOVED' });
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}));
exports.deleteProduct = deleteProduct;
const createProduct = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new productModel_1.default({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        brand: 'samlpe brand',
        image: '/images/teset',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample description'
    });
    const createdProduct = yield product.save();
    res.status(201).json(createdProduct);
}));
exports.createProduct = createProduct;
const updateProduct = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = yield productModel_1.default.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
    }
    const updatedProduct = yield (product === null || product === void 0 ? void 0 : product.save());
    res.status(201).json(updatedProduct);
}));
exports.updateProduct = updateProduct;
//# sourceMappingURL=productController.js.map