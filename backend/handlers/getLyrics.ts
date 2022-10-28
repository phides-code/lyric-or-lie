import { Request, Response } from 'express';
import axios from 'axios';
import moment from 'moment';
import jsdom from 'jsdom';

const getLyrics = async (req: Request, res: Response) => {
    console.log(
        '[' +
            moment(new Date()).format('YYYY-MM-DD - HH:mm:ss') +
            ']: running getLyrics'
    );

    try {
        const axiosResponse = await axios.get(
            'https://www.bestrandoms.com/random-lyrics'
        );

        const dom = new jsdom.JSDOM(axiosResponse.data);
        const rawLyrics: Element = dom.window.document.querySelector(
            '.content > ul > li > pre'
        )!;

        const lyrics = rawLyrics.innerHTML;

        const lyricLines = lyrics
            ?.split('<br>')
            .filter((line) => line !== '' && !line.includes('['))
            .map((line) => line.replaceAll('\n', ''));

        const linecount = lyricLines.length;

        const startIndex = Math.floor(Math.random() * (linecount - 3));

        const lyricsExcerpt = lyricLines.slice(startIndex, startIndex + 3);

        return res.status(200).json({
            status: 200,
            data: lyricsExcerpt,
        });
    } catch (err: any) {
        console.log('got error: ');
        console.log(err.message);
        return res.status(500).json({ status: 500, error: err.message });
    }
};

export default getLyrics;
