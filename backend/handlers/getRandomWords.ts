import { Request, Response } from 'express';
import getNonsense from './getNonsense';
import getPoetry from './getPoetry';
import moment from 'moment';

type RandomResponse = {
    status: number;
    words?: string[];
    error?: string;
};

const getRandomWords = async (req: Request, res: Response) => {
    console.log(
        '[' + moment(new Date()).format('YYYY-MM-DD - HH:mm:ss') + ']: '
    );

    let randomWordsRes: RandomResponse =
        Math.floor(Math.random() * 2) === 1
            ? await getNonsense()
            : await getPoetry();

    res.status(randomWordsRes.status).json(randomWordsRes);
};

export default getRandomWords;
