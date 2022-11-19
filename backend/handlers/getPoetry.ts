import axios from 'axios';

const getPoetry = async () => {
    console.log('running getLyrics');

    try {
        const axiosResponse = await axios.get('https://poetrydb.org/random');

        const poem = axiosResponse.data[0].lines.filter(
            (line: string) => line !== '' && !line.includes('[')
        );
        const linecount = poem.length;
        const startIndex = Math.floor(Math.random() * (linecount - 3));
        const poemExcerpt = poem.slice(startIndex, startIndex + 3);

        return {
            status: 200,
            words: poemExcerpt,
            type: 'poetry',
        };
    } catch (err: any) {
        console.log('got error: ');
        console.log(err.message);
        return { status: 500, error: err.message };
    }
};

export default getPoetry;
