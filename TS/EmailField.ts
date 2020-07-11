import Field from "./Field";
import FieldType from "./FieldType";

export default class EmailField implements Field
{
    name: string;
    label: string;
    type: FieldType;
    value: any;


    constructor(name: string,  lable: string, value: string = '',){
        this.name = name;
        this.value = value;
        this.type = FieldType.text;
    }


    getValue(): string {
        return this.value; 
    }

    render(): HTMLElement {
        const emailInput: HTMLInputElement =   document.createElement("input");
        emailInput.type = 'email';
        emailInput.value = this.value;
        return emailInput;
    }
}