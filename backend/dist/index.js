"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const getPoetry_1 = __importDefault(require("./handlers/getPoetry"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    // res.send('Express + TypeScript Server');
    return res.status(200).json({ status: 200, message: 'OK' });
});
app.get('/getpoetry', getPoetry_1.default);
app.listen(port, () => {
    console.log(`*** Server is running on port ${port} ***`);
});
