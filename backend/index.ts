import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import getPoetry from './handlers/getPoetry';
import getLyrics from './handlers/getLyrics';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    // res.send('Express + TypeScript Server');
    return res.status(200).json({ status: 200, message: 'OK' });
});

app.get('/getpoetry', getPoetry);
app.get('/getlyrics', getLyrics);

app.listen(port, () => {
    console.log(`*** Server is running on port ${port} ***`);
});
