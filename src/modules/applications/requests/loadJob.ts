import { RequestPromiseAPI } from "request-promise";
import { RequestResponse } from "request";
import { JobType } from "../types";

type Props = {
    jobUrn: string;
    sessionToken: string;
};

export const loadJobRequest = {
    get: async (client: RequestPromiseAPI, { jobUrn, sessionToken }: Props): Promise<RequestResponse> => {
        return await client.get(`https://www.linkedin.com/voyager/api/jobs/easyApplyForms?jobPostingUrn=${jobUrn}&q=jobPosting`, {
            headers: {
                accept: "application/vnd.linkedin.normalized+json+2.1",
                "accept-language": "en-US,en;q=0.9",
                "csrf-token": sessionToken,
                "sec-ch-ua": '"Not?A_Brand";v="8", "Chromium";v="108", "Brave";v="108"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-li-lang": "en_US",
                //"cookie": "li_gp=MTsxNjcxMDAzMjg3OzA=; lang=v=2&lang=en-us; bcookie=\"v=2&1047a190-1850-4965-8446-0fbdbc60c810\"; bscookie=\"v=1&20221214073447823d8e76-3163-4288-8e00-27889573dd0bAQHb_OvGEomrmMhgYLDZ7HlD7P9LhS5a\"; li_rm=AQE8d3jYyV41FgAAAYUPjuWOCp8dF9Yn6z4kipNDltWQInTJHMHGKW2fGA-YXsEag19AVa80mgyjo3XzVM6_bm-uLX9n1joWITuObrE5CHpsvd_FqewooceG; G_ENABLED_IDPS=google; li_at=AQEDAT-EP_MEu27cAAABhQ-O_e0AAAGFM5uB7VYAGZRJnzwZZyzFDLn41WQgLSMzGSxS2gO1ct5yDBfCaY3IsJVfI2bxEuY3VhlKMf0jNKVcwXwA6vyFYu3ljGkwd7DeBtW5NJY-qUofGVo7g4MSDkuY; liap=true; JSESSIONID=\"ajax:2255851249287466777\"; timezone=America/Chicago; li_theme=light; li_theme_set=app; li_sugr=72d646bc-3b28-4866-bab2-bfd0edc2c255; _guid=1d36fe89-8333-4217-81ef-15b90a895f45; AnalyticsSyncHistory=AQK5t8eDwG5njwAAAYUPjwuSt0zwitBaBJGIZBtXqFsZUzreRIEO15qDLY_0I75kQebC8K6enM664n339b_GHQ; lms_ads=AQFB7oDsb7cyJwAAAYUPjwxkKvMt6XFLnAFRGohoM7QjULWW1bV6CN1FbJmGEqaYxcRDqx84qLJ5KsoykfaOIxaZy2OWA23l; lms_analytics=AQFB7oDsb7cyJwAAAYUPjwxkKvMt6XFLnAFRGohoM7QjULWW1bV6CN1FbJmGEqaYxcRDqx84qLJ5KsoykfaOIxaZy2OWA23l; li_gpc=1; UserMatchHistory=AQKQQIVH_3VS2gAAAYUSjUtrQfLW2SfMcXy4NlYmcupFcIUJiuKM19s0-xkIewukp2p9Nv4A6xDhbXqMg_sIKqyzeVtMyJyO_biaJD-JPWXCxPzvJlknus83J4_d3VY9e5Hh9uzFlfq48AKXeJWdfZFsEqPaHviPtMdarskBAx-oPGSLQK1TVaPzqWuKw4njlIWIkphdkBgtRxF1FdCvQv80RUwV-9rs6Ix3K_7BLdRYKSnryWtq7h47EkcANIIsCNPVOuLTAlWEV4hBLa-SdkqVrevVuz7wuIoj9CY; sdsc=22%3A1%2C1671053528892%7EJAPP%2C0XglCMHjIHlR8Ai6pSgH5ZMB7JmQ%3D; lidc=\"b=VB31:s=V:r=V:a=V:p=V:g=3834:u=11:x=1:i=1671053528:t=1671134270:v=2:sig=AQE2avClJRHLr1j91AKYiqJFPKIySxop\"",
                //  "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_jobs;dCDFAGHQSTOH6gK6VwrILQ==",
                "x-li-pem-metadata": "Voyager - Careers - Apply=jobs-easy-apply",
                //   "x-li-track": "{\"clientVersion\":\"1.11.4822\",\"mpVersion\":\"1.11.4822\",\"osName\":\"web\",\"timezoneOffset\":-6,\"timezone\":\"America/Chicago\",\"deviceFormFactor\":\"DESKTOP\",\"mpName\":\"voyager-web\",\"displayDensity\":1,\"displayWidth\":1920,\"displayHeight\":1080}",
                "x-restli-protocol-version": "2.0.0",
                // "Referer": "https://www.linkedin.com/jobs/search/?currentJobId=3382884533&f_LF=f_AL&f_TPR=r86400&keywords=Web%20Developer&location=United%20States&start=25",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
        });
    },
};
