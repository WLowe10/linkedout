import { InputTypes } from "./inputTypes";
export type FormType = FormGroup[];

interface FormGroup {
    urn: string;
    required: boolean;
    field: {
        title: string;
        type: InputTypes;
        options?: { displayText: string; value: string; valueUrn?: string }[];
        response: { value: string | undefined; valueUrn: string | null } | null;
    };
}
