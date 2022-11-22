import jsdom from 'jsdom';
// import fetch from 'node-fetch';
const fetch = require('node-fetch');

const getLyrics = async () => {
    console.log('running getLyrics');

    try {
        const fetchResponse = await fetch(
            'https://www.bestrandoms.com/random-lyrics'
        );

        const fetchResponseHtml = await fetchResponse.text();

        const dom = new jsdom.JSDOM(fetchResponseHtml);

        const rawArtist: Element = dom.window.document.querySelector(
            '.content > ul > li > p > span'
        )!;
        const artist = rawArtist.innerHTML;

        const rawTitle: Element = dom.window.document.querySelector(
            '.content > ul > li > p > span:nth-child(2)'
        )!;

        let title: string;

        if (rawTitle.innerHTML.includes('Lyrics')) {
            title = rawTitle.innerHTML.substring(
                0,
                rawTitle.innerHTML.length - 7
            );
        } else {
            title = rawTitle.innerHTML;
        }

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
            artist: artist,
            title: title,
            type: 'song',
        };
    } catch (err: any) {
        console.log('getLyrics caught error: ');
        console.log(err.message);
        return { status: 500, error: err.message };
    }
};

export default getLyrics;
