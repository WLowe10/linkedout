import { homeRequest } from "./home";
import { getJobsRequest } from "./getJobs";
import { loadJobRequest } from "./loadJob";
import { loginRequest } from "./login";
import { submitApplicationRequest } from "./submitApplication";
import { RequestResponse } from "request";
import { RequestPromiseAPI } from "request-promise";

export { homeRequest, getJobsRequest, loadJobRequest, loginRequest, submitApplicationRequest };

export enum RequestTypes {
    home,
    getJobs,
    loadJob,
    login,
    submitApplication,
}

type CreateRequest = {
    //  get?: (client: RequestPromiseAPI, ...args: any[]) => Promise<RequestResponse>,
    //  post?: (client: RequestPromiseAPI, ...args: any[]) => Promise<RequestResponse>,
};

// export const createRequest = (type: RequestTypes, data: {}): CreateRequest => {
//     switch (type) {
//         case RequestTypes.home:
//            // return homeRequest.get();

//         case RequestTypes.login:
//             return loginRequest;

//         case RequestTypes.getJobs:
//             return getJobsRequest;

//         case RequestTypes.loadJob:
//             return loadJobRequest;

//         case RequestTypes.submitApplication:
//             return submitApplicationRequest;
//     };
// };
