import Filed from "./Field";
import FieldType from "./FieldType";


export default class CheckboxField implements Filed{
    name: string;
    label: string;
    type: FieldType;
    value: boolean;


    constructor(name: string, lable: string, value: boolean = false){
        this.name = name;
        this.value = value;
        this.type = FieldType.checkbox;
    }


    render(): HTMLElement {
        let checkbox =   document.createElement("input");
        checkbox.type = "checkbox";
        return checkbox;
    }

    getValue(): any {
        return this.value; 
    }



}