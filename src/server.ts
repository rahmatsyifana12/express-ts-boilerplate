import app from './app';
import config from './configs/config';
import { AppDataSource } from './database/data-source';
import errorHandling from './middlewares/error.middleware';
import routes from './routes';

const port = config.port ?? 5000;

app.listen(port, async () => {
    app.use(routes);
    app.use(errorHandling);

    await AppDataSource.initialize();

    console.log(`Server is running at http://localhost:${port}`);
});