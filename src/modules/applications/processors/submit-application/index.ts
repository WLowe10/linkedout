import { RequestPromiseAPI } from "request-promise";
import { FormType } from "../../types";
import { submitApplicationRequest } from "../../requests";

type Props = {
    serializedForm: any;
    sessionToken: string;
};

export const submitApplication = async (client: RequestPromiseAPI, { serializedForm, sessionToken }: Props) => {
    const { body } = await submitApplicationRequest.post(client, { serializedForm, sessionToken });

    /**
     *
     * ? only 2 cookies are requied for submit
     * li_at
     * JSESSIONID
     *
     *
     */
    return JSON.parse(body);
};
