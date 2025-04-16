import { NextFunction, Request, Response } from 'express';

import logger from '../utils/logger';
import { CustomError } from '../utils/customError';
import { ResponseHandler } from '../utils/responseHandler';
import { RESPONSE_MSG_CODE } from '../utils/consts/reponse';

// Middleware to handle errors
export const handleError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err) {
        logger.error(`ERROR: ${err}`);

        const errorObject = new CustomError('Internal Server Error', RESPONSE_MSG_CODE.INTERNAL_SERVER_ERROR, true);

        return ResponseHandler.sendResponse(res, req, errorObject, RESPONSE_MSG_CODE.SUCCESS, '');
    }
    next();
};