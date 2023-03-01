import rp, { RequestPromiseAPI, jar } from "request-promise";
import { mixedCiphers } from "../../constants/ciphers";
import { FormManager } from "./services";
import querystring from "querystring";
import chalk from "chalk";
import { parseEasyApply } from "./processors/load-job/functions";
import fs from "fs";

const email = "";
const password = "";

import { getJobs, scrapeData, login, loadJob, submitApplication } from "./processors";

export class ApplicationTask {
    private client: RequestPromiseAPI;
    private sessionToken?: string;
    private jar: any;

    constructor() {
        this.jar = rp.jar();

        this.client = rp.defaults({
            jar: this.jar,
            resolveWithFullResponse: true,
            simple: false,
            agentOptions: {
                ciphers: mixedCiphers.join(":"),
            },
        });
    }

    async start() {
        if (!email || !password) return console.log("an email and password is required");

        await this.initializeSession();
        await this.applicationLoop();
    }

    async initializeSession() {
        console.log(chalk.cyan(`[${Date.now()}] scraping data`));

        const scrapeResult = await scrapeData(this.client);
        if (!scrapeResult.data) return console.log("could not parse vital tokens");
        const { token, instance } = scrapeResult.data;

        console.log(chalk.magenta(`[${Date.now()}] logging in`));

        let authenticated = false;

        while (!authenticated) {
            const loginResult = await login(this.client, this.jar, { instanceData: { token, instance }, authentication: { email, password } });
            if (!loginResult.data) return console.log(`login error, ${loginResult.error}`);

            const { sessionToken } = loginResult.data;
            this.sessionToken = sessionToken;

            authenticated = true;
        }

        console.log(chalk.green(`[${Date.now()}] successfully logged in, starting job search`));
    }

    async applicationLoop() {
        if (!this.sessionToken) return;
        let running = true;
        let jobIdx = 0;

        const getJobsResult = await getJobs(this.client, { sessionToken: this.sessionToken, searchParams: { position: "Web Developer", iteration: 0, timeFrame: "ANY", location: "United States" } });
        if (!getJobsResult.data) return console.log("could not load jobs");

        const { jobs, referenceId } = getJobsResult.data;

        while (running) {
            console.log(chalk.blue(`[${jobs[jobIdx].company}][${jobs[jobIdx].title}]`));

            const loadJobRequest = await loadJob(this.client, { job: jobs[jobIdx], sessionToken: this.sessionToken });
            if (!loadJobRequest.data) return console.log("could not load job");
            const { form } = loadJobRequest.data;

            const formManager = new FormManager(form, referenceId);
            const serializedForm = await formManager.prompt();
            await fs.writeFileSync("./responses/json/cases/6/serialized.json", serializedForm, "utf8");

            const submitApplicationResult = await submitApplication(this.client, { serializedForm, sessionToken: this.sessionToken });
            console.log(submitApplicationResult);
            jobIdx += 1;
        }
        //!implement search params
    }
}
