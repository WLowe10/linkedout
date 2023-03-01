import { RequestPromiseAPI } from "request-promise";
import { RequestResponse } from "request";
import querystring from "querystring";

type Props = {
    instanceData: {
        token: string;
        instance: string;
    };
    authentication: {
        email: string;
        password: string;
    };
};

export const loginRequest = {
    post: async (client: RequestPromiseAPI, { instanceData, authentication }: Props): Promise<RequestResponse> => {
        return await client.post("https://www.linkedin.com/uas/login-submit", {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "sec-ch-ua-mobile": "?0",
                "Accept-Encoding": "gzip, deflate, br",
                referer: "https://www.linkedin.com/",
                "sec-ch-ua-platform": '"Windows"',
                "Upgrade-Insecure-Requests": "1",
            },
            body: querystring.stringify({
                loginCsrfParam: instanceData.token,
                session_key: authentication.email,
                session_password: authentication.password,
                trk: "homepage-basic_signin-form_submit",
                controlId: "d_homepage-guest-home-homepage-basic_signin-form_submit-button",
                pageInstance: `${instanceData.instance}`,
            }),
        });
    },
};
