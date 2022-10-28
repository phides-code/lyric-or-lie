import { Request, Response } from 'express';
import axios from 'axios';
import moment from 'moment';

const getPoetry = async (req: Request, res: Response) => {
    console.log(
        '[' +
            moment(new Date()).format('YYYY-MM-DD - HH:mm:ss') +
            ']: running getPoetry'
    );

    try {
        const axiosResponse = await axios.get(
            'https://www.poemist.com/api/v1/randompoems'
        );

        const poem = axiosResponse.data[0].content
            .split('\n')
            .filter((line: string) => line !== '' && !line.includes('['));
        const linecount = poem.length;
        const startIndex = Math.floor(Math.random() * (linecount - 3));
        const poemExcerpt = poem.slice(startIndex, startIndex + 3);

        return res.status(200).json({
            status: 200,
            data: poemExcerpt,
        });
    } catch (err: any) {
        console.log('got error: ');
        console.log(err.message);
        return res.status(500).json({ status: 500, error: err.message });
    }
};

export default getPoetry;
