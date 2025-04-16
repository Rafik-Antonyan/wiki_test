import express from 'express';
import cors from 'cors';

import mainRouter from './routers';
import { handleError } from './middleware/error';

import logger from './utils/logger';
import { CORE } from './config/environments';


const app = express();
const PORT = CORE.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: '*',
    credentials: true, 
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    next();
});

app.use('/api', mainRouter);

app.use(handleError);

app.listen(PORT, () => {
    logger.info(`listening on port ${PORT}`);
});
