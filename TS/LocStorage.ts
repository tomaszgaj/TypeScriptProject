import { DataStorage } from './Interfaces'

export class LocStorage implements DataStorage {

    public saveDocument(formValues: any, isEdit = false, id?: string): string {
        if (isEdit === false) {
            const documentId: string = new Date().getTime().toString();
            const locStorageIds: string = localStorage.getItem('ids');
            const currentIds: string[] = locStorageIds !== null ? JSON.parse(locStorageIds) : [];
            currentIds.push(documentId);
            localStorage.setItem('ids', JSON.stringify(currentIds));
            localStorage.setItem(documentId, JSON.stringify(formValues));
            return documentId;
        } else {
            localStorage.setItem(id, JSON.stringify(formValues));
            return id;
        }
    }

    public loadDocument(documentId: string): {} {
        return JSON.parse(localStorage.getItem(documentId));
    }

    public getDocuments(): string[] {
        return JSON.parse(localStorage.getItem('ids'));
    }

    removeDocument (documentId: string){
        localStorage.removeItem(documentId);
        const ids: string[] = this.getDocuments();
        const fIds: string[] = ids.filter(id => id !== documentId);
        localStorage.setItem('ids', JSON.stringify(fIds));
    }
}