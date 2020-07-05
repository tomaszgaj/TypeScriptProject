import Form from './Form'
import Field from './Field'
import EmailField from "./EmailField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import TextAreaField from "./TextAreaField";


import InputField from './InputField'


export default class App{
    private form: Form;
  

initSimpleForm():Field[] {
    const fields: Field[] = [];
    fields.push(new InputField('firstName', 'Imię'));
    fields.push(new InputField('lastName', 'Nazwisko'));
    fields.push(new EmailField('email', 'E-mail'));
    const courses:string[] = ['Informatics', 'Econometrics']
    fields.push(new SelectField('course', 'Wybierz kierunek studiów', courses));
    fields.push(new CheckboxField('elearning', 'Czy preferujesz e-learning?'));
    fields.push(new TextAreaField('comments', 'Uwagi'));
    return fields;


        
}


}
