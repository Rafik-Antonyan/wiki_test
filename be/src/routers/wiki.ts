import express from 'express';
import { WikiController } from '../controllers/wiki';

const wikiRouter = express.Router();

wikiRouter.get('/', WikiController.getWikiDataByPeriod);

export default wikiRouter;