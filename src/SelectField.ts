import Filed from "./Field";
import FieldType from "./FieldType";


export default class SelectField implements Filed
{
    name: string;
    label: string;
    type: FieldType;
    value: string[];


    constructor(name: string, lable: string , value: string[]){
        this.name = name;
        this.label = lable;
        this.value =value;
        this.type = FieldType.fieldChose;
    }

    render(): HTMLElement {
        let SelectField =   document.createElement("select");
        for(let i = 0; i < this.value.length; i++){
            let option = document.createElement("option");
            option.value = this.value[i];
            SelectField.appendChild(option);
        }

        return SelectField;
    }
    getValue(): any {
        return this.value; 
    }

}