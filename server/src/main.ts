import fs from 'fs/promises';

import express from 'express';
import cors from 'cors';

import {MathUtils} from './utils/math-utils';

const PORT = 5000;

const app = express();
app.use(cors());

app.get('/solution', async (req, res) => {
    const buffer = await fs.readFile('database/words.json');
    const words: string[] = JSON.parse(buffer.toString());

    const randomWord = words[MathUtils.generateRandomInteger(0, words.length)];

    res.json(randomWord);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
