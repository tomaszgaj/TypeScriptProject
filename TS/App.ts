import Form from './Form'
import Field from './Field'
import EmailField from "./EmailField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import TextAreaField from "./TextAreaField";


import InputField from './InputField'


export default class App{
    private form: Form;
  

initSimpleForm(doc: any):Field[] {
    const fields: Field[] = [];
    const { name, lastName, textarea1, select, checbox, textarea2 } = doc;
    fields.push(new InputField('firstName', 'Imię', name));
    fields.push(new InputField('lastName', 'Nazwisko', lastName));
    fields.push(new EmailField('email', 'E-mail', textarea1));
    const options:string[] = ['Informatics', 'Econometrics'];
    fields.push(new SelectField('course', 'Wybierz kierunek studiów', select, options));
    fields.push(new CheckboxField('elearning', 'Czy preferujesz e-learning?', checbox === 'on' ? true : false));
    fields.push(new TextAreaField('comments', 'Uwagi', textarea2));
    return fields;
}


}


    
if (window.location.pathname === '/new-document.html') {
    const app: App = new App();
    const fields: Field[] = app.initSimpleForm({
        name: '', lastName: '', textarea1: '', select: '', checkbox: '', textarea2: ''
    });
    const form: Form = new Form(fields, '0');
    document.body.appendChild(form.render());
}


