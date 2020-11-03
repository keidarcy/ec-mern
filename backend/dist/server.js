"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
dotenv_1.default.config();
db_1.default();
const app = express_1.default();
app.use(express_1.default.json());
app.use('/api/products', productRoutes_1.default);
app.use('/api/user', userRoutes_1.default);
app.use('/api/orders', orderRoutes_1.default);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
//# sourceMappingURL=server.js.map