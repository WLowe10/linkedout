type SearchParams = {
    position: string;
    location: string;
    timeFrame: "ANY" | "PAST_DAY" | "PAST_WEEK" | "PAST_MONTH";
    iteration: number;
};

const jobsPerPage = 25;

export const generateQuery = ({ position, location, timeFrame, iteration }: SearchParams) => {
    let query = `
    https://www.linkedin.com/jobs/search/?f_LF=f_AL
    &keywords=${encodeURIComponent(position)}
    &location=${encodeURIComponent(location)}
    ${
        timeFrame == "ANY"
            ? ""
            : `&f_TPR=r
        ${timeFrame == "PAST_DAY" ? 86400 : timeFrame == "PAST_WEEK" ? 604800 : timeFrame == "PAST_MONTH" ? 2592000 : 0}`
    }
    &start=${jobsPerPage * iteration}
    `.replace(/(\r\n|\n|\r| )/gm, "");

    return query;
};
