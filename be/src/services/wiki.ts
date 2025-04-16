import logger from '../utils/logger';
import WikiAPI from '../api/wiki';
import { CustomError } from '../utils/customError';
import { RESPONSE_MSG_CODE } from '../utils/consts/reponse';

const Wiki = new WikiAPI();

const getWikiDataByPeriod = async (period: number) => {
    try {
        return await Wiki.getWikiDataByPeriods(period);
    } catch (error) {
        logger.error(`WIKI_SERVICE: Error rejecting request \n ${error}`);
        return new CustomError('Internal Server Error', RESPONSE_MSG_CODE.INTERNAL_SERVER_ERROR, true);
    }
};

export const WikiService = {
    getWikiDataByPeriod
};