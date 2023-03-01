import { RequestPromiseAPI } from "request-promise";
import { getJobsRequest } from "../../requests";
import { generateQuery, parseJobs } from "./functions";
import { JobType } from "../../types";
import fs from "fs";
import { ProcessorDataType } from "../../types";

type Props = {
    sessionToken: string;
    searchParams: {
        position: string;
        location: string;
        timeFrame: "ANY" | "PAST_DAY" | "PAST_WEEK" | "PAST_MONTH";
        iteration: number;
    };
};

enum ErrorTypes {}

interface GetJobsData extends ProcessorDataType {
    data?: {
        jobs: JobType[];
        referenceId: string;
    };
    error?: ErrorTypes;
}

export const getJobs = async (client: RequestPromiseAPI, { sessionToken, searchParams }: Props): Promise<GetJobsData> => {
    const { position, location, timeFrame, iteration } = searchParams;
    const { body } = await getJobsRequest.get(client, { sessionToken, searchParams });
    const { jobs, referenceId } = await parseJobs(body);

    return {
        data: {
            jobs,
            referenceId,
        },
    };
};
