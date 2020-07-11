import Filed from "./Field";
import FieldType from "./FieldType";

export default class TextAreaField implements Filed{
    name: string;
    label: string;
    type: FieldType;
    value: any;

    constructor(name: string, lable: string, value: string = ''){
        this.name = name;
        this.value = value;
        this.type = FieldType.text;
    }


    render(): HTMLElement {
        let textarea =   document.createElement("textarea");
        textarea.value = this.value;
        return textarea;
    }

}