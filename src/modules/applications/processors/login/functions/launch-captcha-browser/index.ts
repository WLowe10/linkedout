import puppeteer from "puppeteer";

export const launchCaptchaBrowser = async (challengeEndpoint: string, cookies: any[]): Promise<any[]> => {
    return new Promise(async (resolve) => {
        const browser = await puppeteer.launch({
            headless: false,
            waitForInitialPage: true,
        });

        const page = await browser.newPage();

        for (let i = 0; i < cookies.length; i++) {
            await page.setCookie(cookies[i]);
        }

        await page.setExtraHTTPHeaders({
            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "sec-ch-ua": '"Not?A_Brand";v="8", "Chromium";v="108", "Brave";v="108"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "sec-gpc": "1",
            "upgrade-insecure-requests": "1",
            Referer: "https://www.linkedin.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        });

        await page.goto(`https://www.linkedin.com${challengeEndpoint}`);

        page.on("response", async (response) => {
            if (response.status() == 303) {
                if (response.headers()["location"] == "https://www.linkedin.com/feed/?trk=homepage-basic_signin-form_submit") {
                    const cookies = await page.cookies();
                    console.log(cookies);
                    await browser.close();
                    return resolve(cookies);
                }
            }
        });
    });
};
