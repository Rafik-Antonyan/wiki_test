import express from 'express';

import wikiRouter from './wiki';

const mainRouter = express.Router();

mainRouter.use('/wiki', wikiRouter);

export default mainRouter;