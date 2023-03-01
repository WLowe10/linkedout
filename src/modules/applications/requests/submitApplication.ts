import { RequestPromiseAPI } from "request-promise";

type Props = {
    serializedForm: any;
    sessionToken: string;
};

export const submitApplicationRequest = {
    post: async (client: RequestPromiseAPI, { serializedForm, sessionToken }: Props) => {
        return await client.post("https://www.linkedin.com/voyager/api/jobs/easyApplyForms?action=submitApplication", {
            headers: {
                accept: "application/vnd.linkedin.normalized+json+2.1",
                "accept-language": "en-US,en;q=0.9",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
                "content-type": "application/json; charset=UTF-8",
                "csrf-token": sessionToken,
                "sec-ch-ua": '"Not?A_Brand";v="8", "Chromium";v="108", "Brave";v="108"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-li-lang": "en_US",
                "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_jobs;KrksZzoxSi2Ukwi/2N8RQA==",
                "x-li-track": '{"clientVersion":"1.11.5479","mpVersion":"1.11.5479","osName":"web","timezoneOffset":-6,"timezone":"America/Chicago","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":1920,"displayHeight":1080}',
                "x-restli-protocol-version": "2.0.0",
                // "cookie": "li_rm=AQE8d3jYyV41FgAAAYUPjuWOCp8dF9Yn6z4kipNDltWQInTJHMHGKW2fGA-YXsEag19AVa80mgyjo3XzVM6_bm-uLX9n1joWITuObrE5CHpsvd_FqewooceG; G_ENABLED_IDPS=google; li_at=AQEDAT-EP_MEu27cAAABhQ-O_e0AAAGFM5uB7VYAGZRJnzwZZyzFDLn41WQgLSMzGSxS2gO1ct5yDBfCaY3IsJVfI2bxEuY3VhlKMf0jNKVcwXwA6vyFYu3ljGkwd7DeBtW5NJY-qUofGVo7g4MSDkuY; timezone=America/Chicago; li_theme=light; li_theme_set=app; li_sugr=72d646bc-3b28-4866-bab2-bfd0edc2c255; _guid=1d36fe89-8333-4217-81ef-15b90a895f45; AnalyticsSyncHistory=AQK5t8eDwG5njwAAAYUPjwuSt0zwitBaBJGIZBtXqFsZUzreRIEO15qDLY_0I75kQebC8K6enM664n339b_GHQ; lms_ads=AQFB7oDsb7cyJwAAAYUPjwxkKvMt6XFLnAFRGohoM7QjULWW1bV6CN1FbJmGEqaYxcRDqx84qLJ5KsoykfaOIxaZy2OWA23l; lms_analytics=AQFB7oDsb7cyJwAAAYUPjwxkKvMt6XFLnAFRGohoM7QjULWW1bV6CN1FbJmGEqaYxcRDqx84qLJ5KsoykfaOIxaZy2OWA23l; UserMatchHistory=AQK8MyugOAlogAAAAYUSRsaqV4tzXPO3t35T-cewMIgx23OqLO8RQUUf9PgHMBILzngSuOD7t6CqqlStBl0vLGuK16E1zPprRuqPEiqgMRlWP0kehgjSg0gh41dzGFJ10Zxbh-Z2ITgbn242D4pqYeQ_q_eWPpnkxO_zd5EyW3iXqH4ysPvjJGoxuh3Dqp5Lx2ATqP-0WzLW4vrj9qGg044W552nG0I8uvi1NRWF0OjqkBzvP0XzNDU8zepJuVfM9BORgxBueGtZ_ljmRico-t7g-8BSIVXYp7kOufE;",
                //  "Referer": "https://www.linkedin.com/jobs/search/?currentJobId=3390384728&geoId=103644278&keywords=CGT%20Staffing&location=United%20States&refresh=true",
                "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            body: JSON.stringify(serializedForm),
        });
    },
};
