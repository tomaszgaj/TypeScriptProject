import App from "./App";
import Field from "./Field";
import { LocStorage } from "./LocStorage";

export class FormCreator{
    private _app: App;
    private _LocStorage: LocStorage;
    constructor() {
        this._app = new App();
        this._LocStorage = new LocStorage();
    }
    newForm() {
        const fields: Field[] = this._app.initSimpleForm();
    
        fields.forEach(field => {
            document.body.appendChild(field.render());
        });
    }
    saveForm(){
        this._LocStorage.saveDocument();
    }
    render() {
        const ids: string[] = this._LocStorage.getDocuments();
        const forms: any[] = [];
        ids.forEach(id => {
            forms.push({
                id,
                ...this._LocStorage.loadDocument(id)
            });
        });
        const ul: HTMLElement = document.createElement('ul');
        forms.forEach(form => {
            const { id } = form;
            ul.innerHTML += `<li>${ id }: edit-document.html?id=${ id }">${ id }</a></li>`;
        });
        document.body.appendChild(ul);
    }
}

const formCreater: FormCreator = new FormCreator();
formCreater.render();