import { FormType, InputTypes } from "../../../../types";

export const parseEasyApply = (data: string) => {
    const formData = JSON.parse(data);
    const elements = formData.data.elements;

    const form: FormType = [];

    elements.forEach((element: any) => {
        //*questions
        element.questionGroupings.forEach((formGroup: any) => {
            //* this is the section type of the easy apply form; (Basic, Resume, ETC)
            // const type = group.type

            formGroup.formSection.formElementGroups.map((group: any) => {
                group.formElements.forEach((formElement: any) => {
                    const required = formElement.required;
                    const urn = formElement.urn;
                    const title = formElement.title.text;
                    const response = formElement.response;
                    const selectableOptions = formElement.selectableOptions;
                    //!text input type is a property that shoul be considered

                    let inputType;

                    // * currently known input types
                    switch (formElement.type) {
                        case "CHECKBOX":
                            inputType = InputTypes.Selectable;
                            break;
                        case "DROPDOWN":
                            inputType = InputTypes.Selectable;
                            break;
                        case "RADIO":
                            inputType = InputTypes.Selectable;
                            break;
                        case "SINGLE_LINE_TEXT":
                            inputType = InputTypes.SingleLineText;
                            break;
                        case "AMBRY_MEDIA":
                            inputType = InputTypes.AmbryMedia;
                            break;
                        default:
                            return console.log(`unrecognized input type: ${formElement.type}`);
                    }

                    let options;
                    if (selectableOptions) {
                        //* if easyApply form is riddled with tomfoolery
                        if (selectableOptions.length == 0) return;

                        options = selectableOptions.map((option: any) => {
                            const displayText = option.displayText;
                            const value = option.value;
                            const valueUrn = option.valueUrn;

                            return {
                                displayText,
                                value,
                                valueUrn: valueUrn || null,
                            };
                        });
                    }

                    return form.push({
                        urn: urn,
                        required: required,
                        field: {
                            title: title,
                            type: inputType,
                            options: selectableOptions ? options : null,
                            response: response
                                ? {
                                      //!take maxSelectionCount into consideration
                                      value: response.textResponse ? response.textResponse : response.selectedValuesResponse[0].value,
                                      valueUrn: response.selectedValuesResponse && response.selectedValuesResponse[0].valueUrn,
                                  }
                                : null,
                        },
                    });
                });
            });
        });
    });

    return form;
};
