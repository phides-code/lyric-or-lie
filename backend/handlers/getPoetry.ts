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
        const axiosResponse = await axios.get('https://poetrydb.org/random');
        const linecount = axiosResponse.data[0].linecount;

        const startIndex = Math.floor(Math.random() * (linecount - 3));

        const poemExcerpt = axiosResponse.data[0].lines.slice(
            startIndex,
            startIndex + 3
        );

        return res.status(200).json({
            status: 200,
            data: poemExcerpt,
        });
    } catch (err) {
        console.log('got error: ');
        console.log(err);
        return res.status(500).json({ status: 500, error: err });
    }
};

export default getPoetry;
