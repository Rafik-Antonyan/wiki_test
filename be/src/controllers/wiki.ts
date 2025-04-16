import { Request, Response } from "express";

import { ResponseHandler } from "../utils/responseHandler";
import { WikiService } from "../services/wiki";
import { RESPONSE_MSG_CODE } from "../utils/consts/reponse";
import { WIKI_RESPONSE_MSG } from "../utils/responseMsg/responseMsg";
import logger from "../utils/logger";
import cache from "../utils/cache";

const getWikiDataByPeriod = async (req: Request, res: Response) => {
  const period = req.query.period;

  if (!period) {
    logger.error(
      `WIKI_CONTROLLER: Error period not provided \n ${WIKI_RESPONSE_MSG.WIKI_PERIOD_NOT_PROVIDED}`
    );
    return ResponseHandler.sendResponse(
      res,
      req,
      null,
      RESPONSE_MSG_CODE.BAD_REQUEST,
      WIKI_RESPONSE_MSG.WIKI_PERIOD_NOT_PROVIDED
    );
  }

  const cacheKey = `wiki:period:${period}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    logger.info(`WIKI_CONTROLLER: Serving cached data for period ${period}`);
    return ResponseHandler.sendResponse(
      res,
      req,
      cachedData,
      RESPONSE_MSG_CODE.SUCCESS,
      WIKI_RESPONSE_MSG.WIKI_DATA_RETRIEVED_SUCCESSFULLY
    );
  }

  const response = await WikiService.getWikiDataByPeriod(+period);

  cache.set(cacheKey, response);

  return ResponseHandler.sendResponse(
    res,
    req,
    response,
    RESPONSE_MSG_CODE.SUCCESS,
    WIKI_RESPONSE_MSG.WIKI_DATA_RETRIEVED_SUCCESSFULLY
  );
};

export const WikiController = {
  getWikiDataByPeriod,
};
