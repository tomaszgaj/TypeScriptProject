import Filed from "./Field";



class Form
{
    fields: Filed[];

    constructor(fields: Filed[]){

        this.fields = fields;
        
    }

    render(): HTMLElement {

        let div =   document.createElement("div");
        for(let i = 0; i < this.fields.length; i++ ){
            let input = this.fields[i].render();
            div.appendChild(input);
        }
        return div;
    }

}