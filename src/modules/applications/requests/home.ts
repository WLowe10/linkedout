import { RequestPromiseAPI } from "request-promise";
import { RequestResponse } from "request";

export const homeRequest = {
    get: async (client: RequestPromiseAPI): Promise<RequestResponse> => {
        return await client.get("https://www.linkedin.com/", {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            },
        });
    },
};
