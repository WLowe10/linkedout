import { JobType } from "../../../../types";

export const parseJobs = async (data: any): Promise<{ jobs: JobType[]; referenceId: string }> => {
    const jobData = JSON.parse(data);
    const jobs = jobData["included"].filter((item: any) => item.jobPostingTitle);
    const referenceId = jobData["data"]["metadata"].referenceId;

    const jobsArr = jobs.map((job: any) => {
        let title = job.jobPostingTitle;
        let company = job.primaryDescription.text;
        let jobUrn = job.preDashNormalizedJobPostingUrn;

        return {
            title,
            company,
            jobUrn,
        };
    });

    return {
        jobs: jobsArr,
        referenceId: referenceId,
    };

    ///////////////////////////////////////////////////////////////////////////////////////
    // const document = parse(body);
    // const possibleDataElements = document.querySelectorAll("code[id^='bpr-guid-']")

    // const jobDataElement = possibleDataElements[possibleDataElements.length - 1];
    // let jobData: any = jobDataElement.innerText;

    //  if (!jobData) return;
    //  jobData = JSON.parse(decode(jobData));
    // fs.writeFileSync("./responses/jobs2.json", JSON.stringify(jobData), "utf8")

    //let pageData: any = document.querySelector("#bpr-guid-136821")?.innerText;
    //let pageData = document.querySelector("#bpr-guid-136803")?.innerText; user data;

    ////////////////////////////////////////////////////////////////////////////////////

    //const jobElements = document.querySelectorAll(".jobs-search__results-list > li");

    //  const df = new DataFrame({columnNames: ["company", "title"]});

    // const jobArr = jobElements.map(e => {
    //     let title = e.querySelector(".base-search-card__title")?.textContent.trim();
    //     let location = e.querySelector(".job-search-card__location")?.textContent.trim();
    //     let company = e.querySelector(".hidden-nested-link")?.textContent.trim();
    //     let postedDate = e.querySelector(".job-search-card__listdate")?.textContent.trim();
    //     let postingLink = e.querySelector(".base-card__full-link")?.getAttribute("href");

    //     return {
    //         title,
    //         location,
    //         company,
    //         postedDate,
    //         postingLink
    //     };
    // })

    // let jobUrl = jobArr[0].postingLink;
    // return jobUrl;
};

//
