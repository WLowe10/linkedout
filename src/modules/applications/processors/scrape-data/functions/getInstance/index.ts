import { parse } from "node-html-parser";

export const getInstance = (body: string) => {
    const document = parse(body);
    const instance = document.querySelector("#config")?.getAttribute("data-page-instance");

    return instance;
};
