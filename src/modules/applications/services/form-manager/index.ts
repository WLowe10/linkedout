import { FormType, InputTypes } from "../../types";
import inquirer from "inquirer";

type PromptsType = [
    {
        options?: {
            displayText: string;
            value: string;
            valueUrn?: string;
        }[];
        promptFunc: () => any;
    }
];

export class FormManager {
    private form: FormType;
    private referenceId: string;

    constructor(form: FormType, referenceId: string) {
        this.form = form;
        this.referenceId = referenceId;
    }

    private loadForm(form: FormType) {
        let prompts = [] as unknown as PromptsType;

        form.forEach((input) => {
            let urn = input.urn;
            let required = input.required;
            let title = input.field.title;
            let inputType = input.field.type;
            let options = input.field.options;

            switch (inputType) {
                case InputTypes.Selectable:
                    prompts.push({
                        options: options,
                        promptFunc: async () =>
                            await inquirer.prompt({
                                type: "list",
                                name: title,
                                suffix: required ? " REQUIRED" : undefined,
                                choices: options?.map((opt) => {
                                    return opt.displayText;
                                }),
                            }),
                    });
                    break;

                case InputTypes.SingleLineText:
                    prompts.push({
                        promptFunc: async () =>
                            await inquirer.prompt({
                                type: "input",
                                name: title,
                                suffix: required ? " REQUIRED" : undefined,
                                validate: (input: string) => {
                                    return required ? input !== "" : true;
                                },
                            }),
                    });
                    break;
            }
        });

        return prompts;
    }

    private async processForm(prompts: PromptsType) {
        const rawForm: { query: string; value: any }[] = [];

        for (let i = 0; i < prompts.length; i++) {
            const prompt = prompts[i];
            let answer = await prompt.promptFunc();

            let query = Object.keys(answer)[0];
            let value = Object.values(answer)[0];

            rawForm.push({
                query,
                value,
            });
        }

        return rawForm;
    }

    private async serializeForm(rawForm: { query: string; value: string }[]) {
        let responses: any[] = [];

        this.form.forEach((group: any) => {
            const urn = group.urn;
            const type = group.field.type;
            const title = group.field.title;
            const options = group.field.options;
            //const responseValue = group.field.response;

            let rawFormItem = rawForm.find((raw) => raw.query == title);
            if (!rawFormItem && type !== InputTypes.AmbryMedia) return;

            if (type == InputTypes.SingleLineText) {
                return responses.push({
                    textResponse: rawFormItem?.value,
                    formElementUrn: urn,
                });
            }

            if (type == InputTypes.Selectable) {
                let option = options.find((opt: any) => opt.displayText == rawFormItem?.value);

                return responses.push({
                    formElementUrn: urn,
                    selectedValuesResponse: [
                        option.valueUrn
                            ? {
                                  value: option.value,
                                  valueUrn: option.valueUrn,
                              }
                            : {
                                  value: option.value,
                              },
                    ],
                });
            }

            if (type == InputTypes.AmbryMedia) {
                return responses.push({
                    formElementUrn: urn,
                    ambryMediaResponse: "urn:li:ambryBlob:/AAYUAgC1AAgAAQAAAAAAAENGfgGOsyFnS5CGrRVvacv56w.pdf",
                    fileData: {
                        documentName: "test.pdf",
                        attachmentClass: "ui-attachment--pdf",
                        downloadUrl: "",
                        createdAt: 1669953901601,
                        lastUsedAt: 1671048980997,
                        type: "application/pdf",
                        size: 0,
                    },
                });
            }
        });

        return JSON.stringify({
            followCompany: false,
            responses: responses,
            referenceId: this.referenceId,
            trackingCode: "d_flagship3_search_srp_jobs",
        });
    }

    public async prompt() {
        const prompts = this.loadForm(this.form);
        const rawForm = await this.processForm(prompts);

        const serializedForm = await this.serializeForm(rawForm);
        return serializedForm;
    }
}
