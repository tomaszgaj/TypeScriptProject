import { LocStorage } from "./LocStorage";
import { Router } from "./Router";
import App from "./App";
import Field from "./Field";

export class DocumentList {
    private _locStorage: LocStorage;
    private _app: App;
    private _documentsList: string[] = null;

    constructor() {
        this._locStorage = new LocStorage();
        this._app = new App();
    }

    public getDocumentList(): string[] {
        this._documentsList = this._locStorage.getDocuments();
        return this._documentsList;
    }

    public render(): void {
        console.table(this._documentsList);
        const urls: string[] = this._documentsList.map(el => {
            return `edit-document.html?id=${ el }`;
        });
        console.table(urls);
    
    }
    removeDocument(id: string): void {

    }
    getDocument(id: string) {
        const doc = this._locStorage.loadDocument(id);
        console.log(doc);
        
        const fields: Field[] = this._app.initSimpleForm(doc);
    
        fields.forEach(field => {
            document.body.appendChild(field.render());
        });
        const submitButton: HTMLButtonElement = document.createElement('button');
        submitButton.type = 'button';
        submitButton.textContent = 'submit';
        submitButton.addEventListener('click', (e) => {
            this.save(id);
        });
        document.body.appendChild(submitButton);
    }
    save(id: string): void {
        const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input, textarea, select');
        const [name, lastName, textarea1, select, checbox, textarea2] = inputs;
        
        this._locStorage.saveDocument({
            name: name.value,
            lastName: lastName.value,
            textarea1: textarea1.value,
            select: select.value,
            checbox: checbox.value,
            textarea2: textarea2.value
        }, true, id);
        location.href = '/index.html';
    }
}


const documentList = new DocumentList();
const locStorage = new LocStorage();

if (window.location.pathname === '/document-list.html') {
    const documentsIds: string[] = documentList.getDocumentList();
    const docsUl: HTMLElement = document.querySelector('#docs-ul');

    if (documentsIds !== null) {
        documentsIds.forEach(doc => {
            docsUl.innerHTML += `
            <li style="display: flex">
                <a href="edit-document.html?id=${ doc }">${ doc }</a>
                <button class="remove-btn" data-id="${ doc }">remove</button>
            </li>`
        });
        const removeBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.remove-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const el = e.target as any;
                const id = el.getAttribute('data-id');
                console.log(id);
                locStorage.removeDocument(id);
                window.location.reload();
            });
        });
    }       
}

if (window.location.pathname === '/edit-document.html') {
    const id: string = Router.getParam();
    documentList.getDocument(id);
}
