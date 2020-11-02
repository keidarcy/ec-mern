"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.route('/').post(authMiddleware_1.protect, orderController_1.addOrderItems);
router.route('/:id').get(authMiddleware_1.protect, orderController_1.getOrderById);
exports.default = router;
//# sourceMappingURL=orderRoutes.js.map