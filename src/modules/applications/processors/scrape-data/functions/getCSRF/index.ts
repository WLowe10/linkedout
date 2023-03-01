import { parse } from "node-html-parser";

export const getCSRF = (body: string) => {
    const document = parse(body);
    const token = document.querySelector("[name='loginCsrfParam']")?.getAttribute("value");

    return token;
};
