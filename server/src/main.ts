import express from 'express';
import cors from 'cors';

const PORT = 5000;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json({solution: 'hitch'});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
