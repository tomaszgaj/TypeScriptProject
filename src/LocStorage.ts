import { DataStorage } from './Interfaces'

export class LocStorage implements DataStorage {

    public saveDocument(formValues: any): string {
        const documentId: string = new Date().getTime().toString();
        const locStorageIds: string = localStorage.getItem('ids');
        const currentIds: string[] = locStorageIds !== null ? JSON.parse(locStorageIds) : [];
        currentIds.push(documentId);
        localStorage.setItem('ids', JSON.stringify(currentIds));
        localStorage.setItem(documentId, JSON.stringify(formValues));

        return documentId;
    }

    public loadDocument(documentId: string): {} {
        return JSON.parse(localStorage.getItem(documentId));
    }

    public getDocuments(): string[] {
        return JSON.parse(localStorage.getItem('ids'));
    }
}