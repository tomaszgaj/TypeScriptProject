import Filed from "./Field";
import FieldType from "./FieldType";


export default class SelectField implements Filed
{
    name: string;
    label: string;
    type: FieldType;
    value: string[];
    private _options: string[] = [];


    constructor(name: string, lable: string , value: string[], options: string[]){
        this.name = name;
        this.label = lable;
        this.value =value;
        this._options = options;
        this.type = FieldType.fieldChose;
    }

    render(): HTMLElement {
        let SelectField =   document.createElement("select");
        for(let i = 0; i < this._options.length; i++){
            let option = document.createElement("option");
            option.value = this._options[i];
            option.textContent = this._options[i];
            SelectField.appendChild(option);
        }

        return SelectField;
    }
    getValue(): any {
        return this.value; 
    }

}