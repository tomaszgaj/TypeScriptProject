export default class FieldLabel {
 
    label: string;
 
    constructor(label: string) {
        this.label = label;
    }
 
    render(): HTMLElement {
        const p = document.createElement('label');
        p.innerText = this.label;
        return p;
    }
 
}