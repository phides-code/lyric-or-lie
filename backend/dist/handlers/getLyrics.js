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
const jsdom_1 = __importDefault(require("jsdom"));
const getLyrics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('[' +
        (0, moment_1.default)(new Date()).format('YYYY-MM-DD - HH:mm:ss') +
        ']: running getLyrics');
    try {
        const axiosResponse = yield axios_1.default.get('https://www.bestrandoms.com/random-lyrics');
        const dom = new jsdom_1.default.JSDOM(axiosResponse.data);
        const rawLyrics = dom.window.document.querySelector('.content > ul > li > pre');
        const lyrics = rawLyrics.innerHTML;
        const lyricLines = lyrics === null || lyrics === void 0 ? void 0 : lyrics.split('<br>').filter((line) => line !== '' && !line.includes('[')).map((line) => line.replaceAll('\n', ''));
        const linecount = lyricLines.length;
        const startIndex = Math.floor(Math.random() * (linecount - 3));
        const lyricsExcerpt = lyricLines.slice(startIndex, startIndex + 3);
        return res.status(200).json({
            status: 200,
            data: lyricsExcerpt,
        });
    }
    catch (err) {
        console.log('got error: ');
        console.log(err.message);
        return res.status(500).json({ status: 500, error: err.message });
    }
});
exports.default = getLyrics;
