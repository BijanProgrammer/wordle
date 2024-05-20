import fs from 'fs/promises';

import express from 'express';
import cors from 'cors';

import {MathUtils} from './utils/math-utils';

const PORT = 5000;

async function main(): Promise<void> {
    const words = await readWords();

    const app = express();
    app.use(cors());

    app.get('/solution', async (req, res) => {
        const randomWord = words[MathUtils.generateRandomInteger(0, words.length)];

        res.json(randomWord);
    });

    app.get('/check/:word', async (req, res) => {
        res.json(words.includes(req.params.word));
    });

    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
}

async function readWords(): Promise<string[]> {
    const buffer = await fs.readFile('database/words.json');
    return JSON.parse(buffer.toString());
}

main().then();
