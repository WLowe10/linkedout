import { RequestPromiseAPI } from "request-promise";
import { getCSRF, getInstance } from "./functions";
import { ProcessorDataType } from "../../types";
import { homeRequest } from "../../requests";

enum ErrorTypes {
    UnableToScrape,
}

//lol, I try my best
interface ScrapeDataData extends ProcessorDataType {
    data?: {
        token: string;
        instance: string;
    };
    error?: ErrorTypes;
}

export const scrapeData = async (client: RequestPromiseAPI): Promise<ScrapeDataData> => {
    // const homeRequest = createRequest(RequestTypes.home);
    const { body } = await homeRequest.get(client);

    const token = getCSRF(body);
    const instance = getInstance(body);

    if (!token || !instance) {
        return {
            error: ErrorTypes.UnableToScrape,
        };
    }

    return {
        data: {
            token,
            instance,
        },
    };
};
