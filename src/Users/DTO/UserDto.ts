export class CreateUser{
    private _name: String;
    private _lastname: String;
    private _age: String;
    private _number: Number;
    private _brithDate: Date;
    private _email: String;
    private _password: String;

    constructor(name: String, Lastname: String, age: String, Number: Number, brithDate: Date, email: String, password: String){
        this._name = name;
        this._lastname = Lastname;
        this._age = age;
        this._number = Number;
        this._brithDate = brithDate;
        this._email = email;
        this._password = password;
    }

    get name():  String{
        return this._name
    }

    get Lastname():  String{
        return this._lastname
    }

    get age(): String{
        return this._age
    }

    get Number():  Number{
        return this._number
    }

    get brithDate():  Date{
        return this._brithDate
    }

    get email():  String{
        return this._email
    }

    get password():  String{
        return this._password
    }
    
    set name(value: String){
        this._name = value
    }

    set lastname(value: String){
        this._lastname = value
    }

    set Number(value: Number){
        this._number = value
    }

    set brithDate(value: Date){
        this._brithDate = value
    }

    set email(value: String){
        this._email = value
    }

    set password(value: String){
        this._password = value
    }

    
}

export default CreateUser;