//2. Napisz interfejs Field który będzie definiował podstawowe właściwości i metody pojedynczego pola ankiety. 
//Każde pole powinno zawierać: nazwę, etykietę, typ pola, wartość. 
//Każde pole powinno także móc wyświetlić swoją zawartość we wskazanym miejscu za pomocą metody render(). 
//Wyświetlone pole powinno składać się z etykiety i pola formularza.

import FieldType from "./FieldType";

export default interface Field {
    name: string;
    label: string;
    type: FieldType;
    value: any;

    getValue(): any;

    render(): HTMLElement;
}

