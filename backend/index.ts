import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import getRandomWords from './handlers/getRandomWords';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ status: 200, message: 'OK' });
});

app.get('/api/getrandomwords', getRandomWords);

app.listen(port, () => {
    console.log(`*** Server is running on port ${port} ***`);
});
