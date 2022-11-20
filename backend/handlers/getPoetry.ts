import axios from 'axios';

const getPoetry = async () => {
    console.log('running getPoetry');

    try {
        const axiosResponse = await axios.get('https://poetrydb.org/random');

        const poem = axiosResponse.data[0].lines.filter(
            (line: string) => line !== '' && !line.includes('[')
        );
        const linecount = poem.length;
        const startIndex = Math.floor(Math.random() * (linecount - 3));
        const poemExcerpt = poem.slice(startIndex, startIndex + 3);

        const artist = axiosResponse.data[0].author;
        const title = axiosResponse.data[0].title;

        return {
            status: 200,
            words: poemExcerpt,
            artist: artist,
            title: title,
            type: 'poetry',
        };
    } catch (err: any) {
        console.log('getPoetry caught error: ');
        console.log(err.message);
        return { status: 500, error: err.message };
    }
};

export default getPoetry;
