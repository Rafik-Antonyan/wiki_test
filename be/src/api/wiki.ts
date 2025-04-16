import logger from "../utils/logger";
import { CustomError } from "../utils/customError";
import { wikiDataGenerator } from "../utils/mockGenerators/wikiDataGenerator";
import { RESPONSE_MSG_CODE } from "../utils/consts/reponse";

class WikiAPI {
  async getWikiDataByPeriods(period: number) {
    try {
      logger.debug(`WIKI_API: Starting to get wiki data for ${period} days`);

      const wikiData = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(wikiDataGenerator(period)); // Created as request to the wiki API
        }, 1000);
      });

      logger.info(`WIKI_API: Finished getting wiki data for ${period} days`);

      return wikiData
    } catch (error) {
      logger.error(
        `WIKI_API: Error getting wiki data for ${period} days \n ${error}`
      );

      return new CustomError(
        "Internal Server Error",
        RESPONSE_MSG_CODE.INTERNAL_SERVER_ERROR,
        true
      );
    }
  }
}

export default WikiAPI;
