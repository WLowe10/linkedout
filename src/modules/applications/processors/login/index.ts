import { parse } from "node-html-parser";
import { RequestPromiseAPI } from "request-promise";
import { loginRequest } from "../../requests/login";
import { ProcessorDataType } from "modules/applications/types";
import { launchCaptchaBrowser } from "./functions";
import chalk from "chalk";
import toughCookie from "tough-cookie";
import cookie from "cookie";

enum ErrorTypes {
    IncorrectPassword,
    Captcha,
    Unknown,
}

interface LoginData extends ProcessorDataType {
    data?: {
        sessionToken?: string;
    };
    error?: ErrorTypes;
}

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

export const login = async (client: RequestPromiseAPI, jar: any, { instanceData, authentication }: Props): Promise<LoginData> => {
    const { body, headers, statusCode } = await loginRequest.post(client, { instanceData, authentication });
    //!  (li_at) cookie is responsible for login session cookie

    if (headers.location?.includes("challenge")) {
        console.log(chalk.red(`[${Date.now()}][CAPTCHA] Opening browser, please solve the captcha`));

        const challengeEndpoint = headers.location;

        const browserCookies = await jar.getCookies("https://www.linkedin.com/").map((cookie: any) => ({
            name: cookie.key,
            value: cookie.value,
            domain: "www.linkedin.com",
            path: cookie.path,
            httpOnly: cookie.httpOnly,
            secure: cookie.secure,
        }));

        const captchaCookies = await launchCaptchaBrowser(challengeEndpoint, browserCookies);
        console.log(chalk.green(`[${Date.now()}][CAPTCHA] Got cookies from captcha, continuing applications`));

        for (let i = 0; i < captchaCookies.length; i++) {
            let newCookie = new toughCookie.Cookie(captchaCookies[i]);
            // await jar.setCookie(newCookie.toString(), "https://www.linkedin.com/")
        }

        //!cookies are not being set correctly from submit challenge
        // let tokenCookie = captchaCookies.find((c) => c.name == "JSESSIONID").value;

        return {
            data: {
                // sessionToken: tokenCookie.replace(/["]+/g, '') //? all requests have the double quotes, not sure why this wasnt working as normal
                sessionToken: "",
            },
        };
    }

    if (headers.location == "https://www.linkedin.com/feed/?trk=homepage-basic_signin-form_submit") {
        //! need to replace this with tough cookie

        let tokenCookie = headers["set-cookie"]?.map((c: any) => cookie.parse(c)).find((c: any) => c["JSESSIONID"]);

        if (!tokenCookie) {
            return {
                error: ErrorTypes.Unknown,
            };
        }

        let sessionToken = tokenCookie["JSESSIONID"];

        return {
            data: {
                sessionToken,
            },
        };
    }

    const document = parse(body);

    let err = (document.querySelector("#error-for-password")?.innerText && ErrorTypes.IncorrectPassword) || (headers.location?.includes("checkpoint") && ErrorTypes.Captcha) || "";

    switch (err) {
        case ErrorTypes.Captcha:
            return {
                error: ErrorTypes.Captcha,
            };

        case ErrorTypes.IncorrectPassword:
            return {
                error: ErrorTypes.IncorrectPassword,
            };

        default:
            return {
                error: ErrorTypes.Unknown,
            };
    }
};
