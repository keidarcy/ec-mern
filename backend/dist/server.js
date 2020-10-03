"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./data/products"));
require("colors");
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
db_1.default();
const app = express_1.default();
app.get('/', (req, res) => {
    res.send('RUNININIGNGI');
});
app.get('/api/products', (req, res) => {
    res.json(products_1.default);
});
app.get('/api/products/:id', (req, res) => {
    const product = products_1.default.find((p) => p._id === req.params.id);
    res.json(product);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));
//# sourceMappingURL=server.js.map