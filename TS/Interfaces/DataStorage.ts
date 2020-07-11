export interface DataStorage {
    saveDocument(formValues: any): string;
    loadDocument(documentId: string): {};
    getDocuments(): string[];
}