import Field from "./Field";
import { LocStorage } from "./LocStorage";



export default class Form
{
    fields: Field[];
    private _locaStorage: LocStorage;
    private _id: string;

    constructor(fields: Field[], id: string){

        this.fields = fields;
        this._id = id;
        this._locaStorage = new LocStorage();
        
    }


    save(): void {
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input, textarea, select');
        const [name, lastName, textarea1, select, checbox, textarea2] = inputs;
        
        this._locaStorage.saveDocument({
            name: name.value,
            lastName: lastName.value,
            textarea1: textarea1.value,
            select: select.value,
            checbox: checbox.value,
            textarea2: textarea2.value
        });
        location.href = '/index.html';
    }

    render(): HTMLElement {

        const div = document.createElement("div");
        for(let i = 0; i < this.fields.length; i++ ){
            const input = this.fields[i].render();
            div.appendChild(input);
    
        }

        const submitButton: HTMLButtonElement = document.createElement('button');
        submitButton.type = 'button';
        submitButton.textContent = 'submit';
        submitButton.addEventListener('click', (e) => {
            this.save();
        });
        
        const backButton: HTMLButtonElement = document.createElement('button');
        backButton.textContent = 'back';
        backButton.addEventListener('click', () => {
            history.back();
        });

        div.appendChild(backButton);
        div.appendChild(submitButton);
        
        return div;
        
    }

    

    getValue(): void {};

}