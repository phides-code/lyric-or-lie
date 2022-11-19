import axios from 'axios';
import jsdom from 'jsdom';

const getLyrics = async () => {
    console.log('running getLyrics');

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

        return {
            status: 200,
            words: lyricsExcerpt,
            type: 'lyrics',
        };
    } catch (err: any) {
        console.log('got error: ');
        console.log(err.message);
        return { status: 500, error: err.message };
    }
};

export default getLyrics;
