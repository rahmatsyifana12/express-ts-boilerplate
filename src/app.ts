import express from 'express';
import cors from 'cors';
import config from './configs/config';
import { AppDataSource } from './database/data-source';
import routes from './routes';

const app = express();
const port = config.port ?? 5000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, async () => {
    await AppDataSource.initialize();
    console.log(`Server is running at http://localhost:${port}`);
});