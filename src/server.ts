import 'reflect-metadata';
import express, {Request, Response, NextFunction} from 'express';
import { sequelize } from "./database/models";
import {UserRouter} from './routes/userRoutes';
import {BookRouter} from './routes/bookRoutes';
import swaggerDocs from './utils/swagger';
import {Container} from 'typedi';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from Q Software Book Management</h1>');
});

app.use(Container.get(UserRouter).getRouter());
app.use(Container.get(BookRouter).getRouter());

//Error handler must be last app.use!!
app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    message: 'Something broke! Please contact support.',
  });
});

app.listen(PORT, () => {
  sequelize.sync().then(() => {
    /* eslint-disable no-console */
    console.log(`App running on port ${PORT}`);
  });
  swaggerDocs(app, 3000);
});
