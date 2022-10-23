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
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
const getPoetry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[' +
        (0, moment_1.default)(new Date()).format('YYYY-MM-DD - HH:mm:ss') +
        ']: running getPoetry');
    try {
        const axiosResponse = yield axios_1.default.get('https://poetrydb.org/random');
        const linecount = axiosResponse.data[0].linecount;
        const startIndex = Math.floor(Math.random() * (linecount - 3));
        const poemExcerpt = axiosResponse.data[0].lines.slice(startIndex, startIndex + 3);
        return res.status(200).json({
            status: 200,
            data: poemExcerpt,
        });
    }
    catch (err) {
        console.log('got error: ');
        console.log(err);
        return res.status(500).json({ status: 500, error: err });
    }
});
exports.default = getPoetry;
