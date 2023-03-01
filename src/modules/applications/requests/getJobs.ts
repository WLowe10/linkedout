import { RequestPromiseAPI } from "request-promise";

type Props = {
    sessionToken: string;
    searchParams: {
        position: string;
        location: string;
        timeFrame: "ANY" | "PAST_DAY" | "PAST_WEEK" | "PAST_MONTH";
        iteration: number;
    };
};

export const getJobsRequest = {
    get: async (client: RequestPromiseAPI, { sessionToken, searchParams }: Props) => {
        const { position, location, timeFrame, iteration } = searchParams;

        //!! set up url logic
        return await client.get("https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards?decorationId=com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-133&count=25&q=jobSearch&query=(origin:JOB_SEARCH_PAGE_OTHER_ENTRY,keywords:Web%20Developer,locationUnion:(seoLocation:(location:United%20States)),selectedFilters:(linkedinFeatures:List(f_AL),timePostedRange:List(r86400)),spellCorrectionEnabled:true)&start=25", {
            headers: {
                accept: "application/vnd.linkedin.normalized+json+2.1",
                "accept-language": "en-US,en;q=0.9",
                "csrf-token": sessionToken,
                //  "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Brave\";v=\"108\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "sec-gpc": "1",
                "x-li-deco-include-micro-schema": "true",
                "x-li-lang": "en_US",
                "x-li-page-instance": "urn:li:page:d_flagship3_search_srp_jobs;Yj8ylckhSeuMXiN6CS24Aw==", // ? might need this token, I don't think so though
                "x-li-pem-metadata": "Voyager - Careers=jobs-search-results",
                "x-li-track": '{"clientVersion":"1.11.4822","mpVersion":"1.11.4822","osName":"web","timezoneOffset":-6,"timezone":"America/Chicago","deviceFormFactor":"DESKTOP","mpName":"voyager-web","displayDensity":1,"displayWidth":1920,"displayHeight":1080}',
                "x-restli-protocol-version": "2.0.0",
                // "cookie": "G_ENABLED_IDPS=google; AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg=1; bcookie=\"v=2&96de7741-066d-4b23-82be-c69fd4f7283b\"; bscookie=\"v=1&2022092815245531423bb9-d827-4de2-8c9a-54c712e669d3AQEGZkHO4OpQWnwqlM9ES7qd_a8oSpI1\"; _gcl_au=1.1.77034041.1664378700; li_sugr=dbcaa3f8-08f0-4e99-b3b4-941d14fdf229; _guid=f15218c4-744d-4457-b24d-9c7c34ed5905; fid=AQEwVoVcig6wdgAAAYTByp5r-wFhAHXJfxDDMXZc1UGzpWx11lkToJaFbzeXoNEo0sv30ZIhpEYn3Q; fcookie=AQGp2hjIe7-6AwAAAYTByyzdT5md6ATIcF865OsMMREiUI5RoSZAEJRDfLNxnJmjj80cDj6jotsWtbqn5AgfThmkzR0ldypUDh6A5HgpN4XurGac5ycUfcsjjzQHGoNp7nIaW5sInc75Haw8ECzhmWvysWVDnpXNx0uB5VBVQEqP3b05RTrAoZ5JPb4VfRN5OLUi1xG38zT2Ohzhf2EvDfJc2az7aFswVTThMb6stWLho5NNObMm_i7Ilej-uu8VNHkl-wZvSI7MdKhSJG9iPlWeE1getuNFJUUU0br2ruNHX0cnP93dbT53EhFJ/MW6JDOYSzPofHwyImAOD+/7/F4I1Jvw==; timezone=America/Chicago; li_theme=light; li_theme_set=app; li_rm=AQHyYYEO3fb6nwAAAYTBzdidb8JO8_jOVjQHuIbsVJ59rIvvzqn_cMsHbt1_N1dTQDrHe0r8HaB6-dsHXyL416ZhEpUIkxjZVgZ_zvLKpuzIEndLafxQrC-0ZIOSfY4SUEjnir4g4NWkCgzCSb9gw6apWT7qNHHK43NEtA4lScEigLocO6frlI6oODx9bycYZ4fzLCQ4khyEfb9L_m4r9nEa0L1ftHO7hF0ro6sFJyY0Sa2Qr9svXoifBV71-lQsJbXtdTbO111zIB1kFOCnw5izu4gCgdAf8XkcIUM3U2qiLEFm8Z3bICKOxxALKXnKvgLdZKy9F9V8QFN9FLI; visit=v=1&M; lang=v=2&lang=en-us; g_state={\"i_p\":1669950698992,\"i_l\":2}; li_at=AQEDAT-EP_ME0_qcAAABhMvK-ygAAAGE79d_KFYAaQzV00D5wNOdeyQfXaKLJzBv9UZhCDrmP4EWft0FLtapOqJIDRHHQWtaW0NWEtry_GpzjHtjnftpRW8vcuRjJH1OFNVlvYaGdREVS3cKr2u2YBAA; liap=true; JSESSIONID=\"ajax:7635793030263493967\"; AnalyticsSyncHistory=AQIAiy0pJVhBCAAAAYTRb9QxnVPvWUWIs4bjjingKCdjarPNWbwVwxMM_GCB2ccJP-Yq-DTud2IhnXN9Jfp1Ag; lms_ads=AQEkDoHIhHzClAAAAYTRb9VGpv_l7tZFlCvuNUSEtRBYpXyinEuoqgtJaMjxc31ZQSkjLumuifGMh9OAfitUiskfU-cgayWM; lms_analytics=AQEkDoHIhHzClAAAAYTRb9VGpv_l7tZFlCvuNUSEtRBYpXyinEuoqgtJaMjxc31ZQSkjLumuifGMh9OAfitUiskfU-cgayWM; aam_uuid=85663870963292714937526241026458311974; UserMatchHistory=AQLSF6u0DvO6wAAAAYTVy0DFl4cl27RjhO7HfNItcLVZQcXc6c4x55OruOvCOHyxLoV81WoBlUSKVXbt9NsSRSYSwhMZjNooRahIOg0MKzVyfzGvB6JhcUGeY06FWhw3UEl66x1ce1oqdp3tGpZj8CXD1e5vYnP_kmocWKOtPyXDIrJzej_LeXyySOFpKADK1CInYw5GT2lEqDx02A3nV-VAicaiJyVUT56PKl1Q2bv9CIWgo5ixsntnKLXs78e4Nxso5Ewn738RWHYAocoLs4kohXro1TuWklz0Kzc; sdsc=22%3A1%2C1670034178951%7EJAPP%2C0DadVSjdBuQ%2FS15MCkDAd2Ky2BbA%3D; lidc=\"b=VB31:s=V:r=V:a=V:p=V:g=3797:u=4:x=1:i=1670034178:t=1670093887:v=2:sig=AQE22s-e_vob1d4htTCY_EiqLk23usCY\"; AMCV_14215E3D5995C57C0A495C55%40AdobeOrg=-637568504%7CMCIDTS%7C19330%7CMCMID%7C85159600759725616787547394617721106157%7CMCOPTOUT-1670041379s%7CNONE%7CvVersion%7C5.1.1%7CMCAAMLH-1670638979%7C7%7CMCAAMB-1670638979%7Cj8Odv6LonN4r3an7LhD3WZrU1bUpAkFkkiY1ncBR96t2PTI%7CMCCIDH%7C-1468346528",
                //"Referer": "https://www.linkedin.com/jobs/search/?currentJobId=3382884533&f_LF=f_AL&f_TPR=r86400&keywords=Web%20Developer&location=United%20States&start=25",
                //"Referrer-Policy": "strict-origin-when-cross-origin"
            },
        });
    },
};
