import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config';
import AuthRouter from './routes/Auth';
import UsersRouter from './routes/Users';
import SearchRouter from './routes/Search';

const app: express.Application = express();

mongoose
    .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .catch((err) => {
        console.error(`MongoDB Connection Error: ${err}`);
    });

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
    return res.json({message: 'API Is Running Properly'});
});

app.use('/auth', AuthRouter);
app.use('/users', UsersRouter);
app.use('/search', SearchRouter);

export default app;
