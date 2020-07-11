import Field from "./Field";
import FieldType from "./FieldType";

class DataField implements Field
{
    name: string;
    label: string
    type: FieldType;
    value: any;


    constructor(name: string, value: string, label: string  ){
        this.name = name;
        this.value = value;
        this.type = FieldType.data;
      
        }

        render(): HTMLElement {
            let DataField = document.createElement("input");
            DataField.type = 'date';
            return DataField;
    
    }
    getValue(): any {
        return this.value; 
    }


}

    