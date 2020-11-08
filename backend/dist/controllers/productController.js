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
exports.createProductReview = exports.createProduct = exports.updateProduct = exports.deleteProduct = exports.getProductById = exports.getProducts = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const productModel_1 = __importDefault(require("../models/productModel"));
const getProducts = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pageSize = 2;
    const page = req.query.pageNumber ? Number(req.query.pageNumber) : 1;
    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        }
        : {};
    const count = yield productModel_1.default.countDocuments(Object.assign({}, keyword));
    const products = yield productModel_1.default.find(Object.assign({}, keyword))
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
const createProductReview = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { rating, comment } = req.body;
    const product = (yield productModel_1.default.findById(req.params.id));
    if (product) {
        const alreadyReviewed = (_a = product.reviews) === null || _a === void 0 ? void 0 : _a.find((r) => r.user.toString() === req.user._id.toString());
        if (alreadyReviewed) {
            res.status(404);
            throw new Error('Product already reviewd');
        }
    }
    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id
    };
    (_b = product === null || product === void 0 ? void 0 : product.reviews) === null || _b === void 0 ? void 0 : _b.push(review);
    product.numReviews = (_c = product === null || product === void 0 ? void 0 : product.reviews) === null || _c === void 0 ? void 0 : _c.length;
    product.rating =
        ((_d = product === null || product === void 0 ? void 0 : product.reviews) === null || _d === void 0 ? void 0 : _d.reduce((acc, item) => item.rating + acc, 0)) / ((_e = product === null || product === void 0 ? void 0 : product.reviews) === null || _e === void 0 ? void 0 : _e.length);
    yield (product === null || product === void 0 ? void 0 : product.save());
    res.status(201).json({ message: 'Review added' });
}));
exports.createProductReview = createProductReview;
//# sourceMappingURL=productController.js.map