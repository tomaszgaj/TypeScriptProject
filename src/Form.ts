import Field from "./Field";
import { LocStorage } from "./LocStorage";



export default class Form
{
    fields: Field[];
    private _locaStorage: LocStorage;

    constructor(fields: Field[]){

        this.fields = fields;
        this._locaStorage = new LocStorage();
        
    }


    save(): void {
        this._locaStorage.saveDocument();
        location.href = '/';
    }

    render(): HTMLElement {

        const div = document.createElement("div");
        for(let i = 0; i < this.fields.length; i++ ){
            const input = this.fields[i].render();
            div.appendChild(input);
    
        }

        const submitButton: HTMLButtonElement = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.addEventListener('click', () => {
            this.save();
        });
        
        const backButton: HTMLButtonElement = document.createElement('button');
        backButton.addEventListener('click', () => {
            history.back();
        });

        div.appendChild(backButton);
        div.appendChild(submitButton);
        
        return div;
        
    }

    

    getValue(): void {};

}