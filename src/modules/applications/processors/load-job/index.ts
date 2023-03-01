//* Requests *
import { loadJobRequest } from "../../requests";
// * Functions *
import { parseEasyApply } from "./functions";
// * Types *
import { RequestPromiseAPI } from "request-promise";
import { JobType } from "../../types";
import fs from "fs";

type Props = {
    job: JobType;
    sessionToken: string;
};

export const loadJob = async (client: RequestPromiseAPI, { job, sessionToken }: Props) => {
    const { jobUrn } = job;
    const { body } = await loadJobRequest.get(client, { jobUrn: encodeURIComponent(jobUrn), sessionToken });
    // await fs.writeFileSync("./responses/json/easyApplyData${Date.now()}.json", body, "utf8")

    //!!crsf error: CSRF check failed.

    return {
        data: {
            form: parseEasyApply(body),
        },
    };
};
