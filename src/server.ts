import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import db from "./database/models";
import { userRoutes } from './routes/userRoutes';
import { bookRoutes } from './routes/bookRoutes';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("<h1>Hello from Q Software Book Management</h1>")
})

app.use(userRoutes);
app.use(bookRoutes);

//Error handler must be last app.use!!
app.use((err, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({
        success: false,
        message: 'Something broke! Please contact support.'
    })
})

app.listen(PORT, () => {
    db.sequelize.sync().then(() => {
        console.log(`App running on port ${PORT}`)
    });
})