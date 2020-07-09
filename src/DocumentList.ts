import { LocStorage } from "./LocStorage";

export class DocumentList {
    private _locStorage: LocStorage;
    private _documentsList: string[] = null;

    constructor() {
        this._locStorage = new LocStorage();
    }

    public getDocumentList(): void {
        this._documentsList = this._locStorage.getDocuments();
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
    getDocument(id: string){

    }
}