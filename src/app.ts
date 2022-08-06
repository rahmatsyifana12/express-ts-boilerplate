import express from 'express';
import cors from 'cors';
import config from './configs/config';

const app = express();
const port = config.port ?? 5000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});